import { useState } from 'react'
import './NavigationHeader.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useEffect } from 'react';
import { getLocalStorageValue, setLocalStorageValue } from '../../helpers/localStorage.helpers';
import { LocalStorageKeys } from '../../enums/localStorageKeys.enum';
import {IoMdMenu} from "react-icons/io";
import {useMenu} from "../../contexts/sideMenu.context.tsx";
import {useIsMobile} from "../../helpers/layout.helpers.ts";

const NavigationHeader = () => {

  const [theme, setTheme] = useState(getLocalStorageValue<string>(LocalStorageKeys.THEME) || 'light');
  const {toggleMenu} = useMenu();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);



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
