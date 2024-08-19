import NavigationHeader from '../navigationHeader/NavigationHeader'
import CalendarComponent from '../calendar/CalendarComponent'
import Todos from '../todos/Todos'
import './CalendarApp.css'
import Notes from '../notes/Notes'
import GptChat from '../gptChat/gptChat'
import GptService from '../../services/gptService'

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
            {
              GptService.getInstance().hasApiKey() && <GptChat></GptChat>
            }
          </div>
        </main>
    </div>
  ) 
}

export default CalendarApp