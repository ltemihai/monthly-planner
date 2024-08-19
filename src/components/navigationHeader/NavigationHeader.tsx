import { useState } from 'react'
import './NavigationHeader.css'
import { FaCloud } from 'react-icons/fa6';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { PiOpenAiLogoLight } from "react-icons/pi";
import FirebaseModal, { FirebaseConfig } from './firebaseModal/FirebaseModal';
import { FirebaseService, setFirebaseConfig } from '../../services/firebaseService';
import useCalendarState from '../../state/calendarState';
import GptModal, { GptModalConfig } from './gptModal/GptModal';
import GptService from '../../services/gptService';
import { useEffect } from 'react';

const NavigationHeader = () => {



  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const calendarState = useCalendarState();
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [showGptModal, setShowGptModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleFirebaseSync = async (config: FirebaseConfig) => {
    setFirebaseConfig(config);
    if (localStorage.getItem('firebaseConfig')) {
      FirebaseService().saveFirestoreConfig(calendarState);
    }
  };

  const handleGptSync = async (config: GptModalConfig) => {
    GptService.getInstance().setApiKey(config.apiKey);
  }

  const handleTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }

  return (
    <header>
      <h1>The Board</h1>
      <div className='icons'>
        <FaCloud className='pointer' onClick={() => setShowFirebaseModal(!showFirebaseModal)}></FaCloud>
        {showFirebaseModal && (
          <FirebaseModal onClose={() => setShowFirebaseModal(false)} onSave={async (config) => await handleFirebaseSync(config)}></FirebaseModal>
        )}
        <PiOpenAiLogoLight className='pointer' onClick={() => setShowGptModal(!showGptModal)} />
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