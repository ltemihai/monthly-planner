import { create } from 'zustand';
import { getLocalStorageValue } from '../helpers/localStorage.helpers';
import { LocalStorageKeys } from '../enums/localStorageKeys.enum';

type GptState = {
    apiKey: string;
    setApiKey: (apiKey: string) => void;
};

const useGptStore = create<GptState>((set) => ({
    apiKey: '',
    setApiKey: (apiKey) => set({ apiKey }),
}));

if(getLocalStorageValue(LocalStorageKeys.GPT_API_KEY)) {
    useGptStore.setState({ apiKey: getLocalStorageValue(LocalStorageKeys.GPT_API_KEY) });
}

export default useGptStore;