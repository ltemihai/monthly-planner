import React, { useEffect, useState } from 'react'
import './NavigationHeader.css'

const NavigationHeader = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header>
        <h1>The Board</h1>
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} checked={theme === 'dark'} />
          <span className="slider round"></span>
        </label>
    </header>
  )
}

export default NavigationHeader  