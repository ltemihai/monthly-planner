import { create } from 'zustand';
import { getLocalStorageValue, setLocalStorageValue } from '../helpers/localStorage.helpers';
import { LocalStorageKeys } from '../enums/localStorageKeys.enum';

type LandingPageState = LandingPageStateModel & {
    setHasPassedFirstTime: (isFirstTime: boolean) => void;
};

type LandingPageStateModel = {
    hasPassedFirstTime: boolean;
};

const useLandingPage = create<LandingPageState>((set) => ({
    hasPassedFirstTime: getLocalStorageValue<boolean>(LocalStorageKeys.HAS_PASSED_FIRST_TIME),
    setHasPassedFirstTime: (hasPassedFirstTime) => {
        setLocalStorageValue(LocalStorageKeys.HAS_PASSED_FIRST_TIME, hasPassedFirstTime);
        set({hasPassedFirstTime: hasPassedFirstTime});
    }
}));

export default useLandingPage;