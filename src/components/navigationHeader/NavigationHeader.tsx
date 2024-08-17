import React, { useEffect, useState } from 'react'
import './NavigationHeader.css'

const NavigationHeader = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header>
        <h1>Calendar</h1>
        <i onClick={toggleTheme}>Settings</i>
    </header>
  )
}

export default NavigationHeader  