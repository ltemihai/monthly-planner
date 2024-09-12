import { useState } from 'react'
import './NavigationHeader.css'
import { FaCloud } from 'react-icons/fa6';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { PiOpenAiLogoLight } from "react-icons/pi";
import FirebaseModal from './firebaseModal/FirebaseModal';
import { FirebaseService } from '../../services/firebaseService';
import useCalendarState, { startFirebaseSync } from '../../state/calendarState';
import GptModal, { GptModalConfig } from './gptModal/GptModal';
import GptService from '../../services/gptService';
import { useEffect } from 'react';
import { getLocalStorageValue, setLocalStorageValue } from '../../helpers/localStorage.helpers';
import { LocalStorageKeys } from '../../enums/localStorageKeys.enum';
import useGptStore from '../../state/gptState';
import { FirebaseConfig } from '../../types/firebase.types';
import useFirebaseState from '../../state/firesbaseState';
import LoadingSpinner from '../shared/loading-spinner/LoadingSpinner';
import useToastStore from '../../state/toastState';
import { ToastEnum } from '../../enums/toast.enum';
import {IoMdMenu} from "react-icons/io";
import {useMenu} from "../../contexts/sideMenu.context.tsx";
import {useIsMobile} from "../../helpers/layout.helpers.ts";

const NavigationHeader = () => {

  const calendarState = useCalendarState();
  const firebaseState = useFirebaseState();
  const gptState = useGptStore();
  const addToast = useToastStore((state) => state.addToast);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [showGptModal, setShowGptModal] = useState(false);
  const [theme, setTheme] = useState(getLocalStorageValue<string>(LocalStorageKeys.THEME) || 'light');
  const {toggleMenu } = useMenu();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleFirebaseSync = async (config: FirebaseConfig) => {
    try {
      await FirebaseService().saveFirestoreConfig(config, {
        selectedDate: calendarState.selectedDate,
        currentDate: calendarState.currentDate,
        todos: calendarState.todos,
        notes: calendarState.notes,
        tasks: calendarState.tasks
      });
      calendarState.setState(getLocalStorageValue(LocalStorageKeys.CALENDAR_STATE));
      startFirebaseSync();
      addToast('Dayboard is synced with Firebase!', ToastEnum.SUCCESS);
      setShowFirebaseModal(false);
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
      setShowGptModal(false);
    } catch (error) {
      console.error(error);
      addToast('Error connecting to ChatGPT!', ToastEnum.ERROR);
    }
  }

  const handleTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    setLocalStorageValue(LocalStorageKeys.THEME, theme);
    setTheme(theme);
  }

  return (
    <header>
      {isMobile && <IoMdMenu className="pointer" onClick={() => toggleMenu()}/>}
      <h1>Dayboard</h1>
      <div className='icons'>
        {!Object.keys(firebaseState.config).length ? (
          <FaCloud className='pointer' onClick={() => {
            setShowFirebaseModal(!showFirebaseModal);
            setShowGptModal(false);
          }}></FaCloud>) : firebaseState.isSyncing && <LoadingSpinner tooltipText='Dayboard is syncing'></LoadingSpinner>
        }
        {showFirebaseModal && (
          <FirebaseModal onClose={() => setShowFirebaseModal(false)} onSave={async (config) => await handleFirebaseSync(config)}></FirebaseModal>
        )}
        <PiOpenAiLogoLight className='pointer' onClick={() => {
          setShowGptModal(!showGptModal);
          setShowFirebaseModal(false);
        }} />
        {showGptModal && (
          <GptModal onClose={() => setShowGptModal(false)} onSave={async (config) => await handleGptSync(config)}></GptModal>
        )}
        {theme === 'dark' ? (
          <MdOutlineLightMode className='pointer' onClick={() => handleTheme('light')}/>
        ) : (
          <MdOutlineDarkMode className='pointer' onClick={() => handleTheme('dark')}/>
        )}
      </div>
      
    </header>
  );
}

export default NavigationHeader  
