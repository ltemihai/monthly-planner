import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

export const FirebaseService = (() => {

    let firebaseConfig = JSON.parse(localStorage.getItem('firebaseConfig')!);

    let app = initializeApp(firebaseConfig);
    let db = getFirestore(app);

    if (!firebaseConfig) {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
    

    const saveFirestoreConfig = async (calendarState: any) => {  
        try {
            const data = await getDocs(collection(db, 'the_board'));
            if (data.empty) {
                await postFirestoreData(calendarState);
            }
            localStorage.setItem('firebaseConfig', JSON.stringify(firebaseConfig));
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    }

    const getFirestoreData = async () => {
        try {
            const data = await getDocs(collection(db, 'the_board'));
            if (!data.empty) {
                data.forEach((doc) => {
                    const calendarState = doc.data().calendar_state;
                    localStorage.setItem('calendarState', JSON.stringify(calendarState));
                });
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    }

    const postFirestoreData = async (calendarState: any) => {
        const docRef = (await getDocs(collection(db, 'the_board')));
        if (docRef.empty) {
            await addDoc(collection(db, 'the_board'), {
                calendar_state: calendarState
            });
        } else {
            docRef.forEach((doc) => {
                updateDoc(doc.ref, {
                    calendar_state: calendarState
                });
            });
        }
    }

    return {
        saveFirestoreConfig,
        getFirestoreData,
        postFirestoreData
    };
});

export const setFirebaseConfig = (config: any) => {
    localStorage.setItem('firebaseConfig', JSON.stringify(config));
}
