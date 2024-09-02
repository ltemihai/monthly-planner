import CalendarComponent from '../../components/calendar/CalendarComponent'
import Todos from '../../components/todos/Todos'
import './Diary.css'
import Notes from '../../components/notes/Notes'
import GptChat from '../../components/gptChat/gptChat'
import useGptStore from '../../state/gptState'

const Diary = () => {

  const isUsingGpt = useGptStore().apiKey;

  return (
    <div className='calendar-app'>
        <main className='calendar-app__main'>
          <div className='calendar-app__main__column'>
            <CalendarComponent></CalendarComponent>
            <Notes></Notes>
          </div>
          <div className='calendar-app__main__column'>
            <Todos></Todos>
            {
              isUsingGpt && <GptChat></GptChat>
            }
          </div>
        </main>
    </div>
  ) 
}

export default Diary