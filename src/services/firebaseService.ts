import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { addDoc, collection, Firestore, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { LocalStorageKeys } from '../enums/localStorageKeys.enum'; 
import { getLocalStorageValue, setLocalStorageValue } from '../helpers/localStorage.helpers';
import { CalendarModel } from '../types/calendarState.types';
import { FirebaseConfig } from '../types/firebase.types';

export const FirebaseService = (() => {

    let firebaseConfig = {} as FirebaseOptions;

    let app: FirebaseApp;
    let db: Firestore;

    const setConfig = (config: FirebaseConfig) => {
        firebaseConfig = config;
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }

    if(getLocalStorageValue(LocalStorageKeys.FIREBASE_CONFIG)) {
        setConfig(getLocalStorageValue(LocalStorageKeys.FIREBASE_CONFIG));
    }
 
    const saveFirestoreConfig = async (config: FirebaseConfig, calendarState: CalendarModel) => {  
        setConfig(config);
        try {
            const data = await getDocs(collection(db, 'the_board'));
            if (data.empty) {
                await postFirestoreData(calendarState);
            } else {
                data.forEach((doc) => {
                    const calendarState = doc.data().calendar_state;
                    setLocalStorageValue(LocalStorageKeys.CALENDAR_STATE, calendarState);
                });
            }
            setLocalStorageValue(LocalStorageKeys.FIREBASE_CONFIG, firebaseConfig);
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
                    setLocalStorageValue(LocalStorageKeys.CALENDAR_STATE, calendarState);
                });
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    }

    const postFirestoreData = async (calendarState: CalendarModel) => {
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
        postFirestoreData,
        setConfig
    };
});
