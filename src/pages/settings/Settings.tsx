import FirebaseModal from "./firebaseModal/FirebaseModal.tsx";
import GptModal, {GptModalConfig} from "./gptModal/GptModal.tsx";
import './Settings.css';
import {FirebaseConfig} from "../../types/firebase.types.ts";
import {FirebaseService} from "../../services/firebaseService.ts";
import {getLocalStorageValue} from "../../helpers/localStorage.helpers.ts";
import {LocalStorageKeys} from "../../enums/localStorageKeys.enum.ts";
import useCalendarState, {startFirebaseSync} from "../../state/calendarState.tsx";
import {ToastEnum} from "../../enums/toast.enum.ts";
import GptService from "../../services/gptService.ts";
import useGptStore from "../../state/gptState.tsx";
import useToastStore from "../../state/toastState.tsx";

export const Settings = () => {

    const calendarState = useCalendarState();
    const gptState = useGptStore();
    const addToast = useToastStore((state) => state.addToast);

    const handleFirebaseSync = async (config: FirebaseConfig) => {
        try {
            await FirebaseService().saveFirestoreConfig(config, {
                selectedDate: calendarState.selectedDate,
                currentDate: calendarState.currentDate,
                todos: calendarState.todos,
                notes: calendarState.notes,
                tasks: calendarState.tasks,
                habits: calendarState.habits
            });
            calendarState.setState(getLocalStorageValue(LocalStorageKeys.CALENDAR_STATE));
            startFirebaseSync();
            addToast('Dayboard is synced with Firebase!', ToastEnum.SUCCESS);
        }
        catch (error) {
            console.error(error);
            addToast('Error syncing with Firebase!', ToastEnum.ERROR);
        }
    };

    const handleGptSync = async (config: GptModalConfig) => {
        try {
            await GptService().validateApiKey(config.apiKey);
            gptState.setApiKey(config.apiKey);
            addToast('Dayboard is connected to ChatGPT!', ToastEnum.SUCCESS);
        } catch (error) {
            console.error(error);
            addToast('Error connecting to ChatGPT!', ToastEnum.ERROR);
        }
    }

    return (
        <div className='settings'>
            <FirebaseModal onSave={async (config) => await handleFirebaseSync(config)}></FirebaseModal>
            <GptModal onSave={async (config) => await handleGptSync(config)}></GptModal>
        </div>
    )
}
