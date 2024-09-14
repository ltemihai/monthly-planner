import HabitCalendar from '../../components/habitCalendar/HabitCalendar'
import './HabitTracker.css'

const HabitTracker = () => {
  return (
    <div className='habit-page'>
        <HabitCalendar></HabitCalendar>
    </div>
  )
}

export default HabitTracker