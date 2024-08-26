import { create } from 'zustand';
import { getLocalStorageValue } from '../helpers/localStorage.helpers';
import { LocalStorageKeys } from '../enums/localStorageKeys.enum';
import { FirebaseConfig } from '../types/firebase.types';

type FirebaseState = {
    config: FirebaseConfig;
    isSyncing: boolean;
    setFirebaseConfig: (config: FirebaseConfig) => void;
    setSyncing: (isSyncing: boolean) => void;
};

const useFirebaseState = create<FirebaseState>((set) => ({
    config: {} as FirebaseConfig,
    isSyncing: false,
    setFirebaseConfig: (config) => set({ config }),
    setSyncing: (isSyncing) => set({ isSyncing }),
}));

if(getLocalStorageValue(LocalStorageKeys.FIREBASE_CONFIG)) {
    useFirebaseState.setState({ config: getLocalStorageValue(LocalStorageKeys.FIREBASE_CONFIG) });
}

export default useFirebaseState;