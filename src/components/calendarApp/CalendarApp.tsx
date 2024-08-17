import React from 'react'
import NavigationHeader from '../navigationHeader/NavigationHeader'
import CalendarComponent from '../calendar/CalendarComponent'
import Todos from '../todos/Todos'
import './CalendarApp.css'
import Notes from '../notes/Notes'
import Meetings from '../meetings/Meetings'

const CalendarApp = () => {
  return (
    <div className='calendar-app'>
        <NavigationHeader />
        <main className='calendar-app__main'>
            <CalendarComponent></CalendarComponent>
            <Todos></Todos>
            <Meetings></Meetings>
            <Notes></Notes>
        </main>
    </div>
  ) 
}

export default CalendarApp