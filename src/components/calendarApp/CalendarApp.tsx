import NavigationHeader from '../navigationHeader/NavigationHeader'
import CalendarComponent from '../calendar/CalendarComponent'
import Todos from '../todos/Todos'
import './CalendarApp.css'
import Notes from '../notes/Notes'

const CalendarApp = () => {
  return (
    <div className='calendar-app'>
        <NavigationHeader />
        <main className='calendar-app__main'>
          <div className='calendar-app__main__column'>
            <CalendarComponent></CalendarComponent>
            <Notes></Notes>
          </div>
          <div className='calendar-app__main__column'>
            <Todos></Todos>
          </div>
        </main>
    </div>
  ) 
}

export default CalendarApp