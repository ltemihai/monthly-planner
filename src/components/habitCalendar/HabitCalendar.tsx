import CalendarHeader from '../calendar/calendarHeader/CalendarHeader'
import HabitCalendarDays from './components/habitCalendarDays/HabitCalendarDays'
import './HabitCalendar.css'

const HabitCalendar = () => {
  return (
    <div className='habit-calendar'>
        <CalendarHeader></CalendarHeader>
        <HabitCalendarDays></HabitCalendarDays>
    </div>

  )
}

export default HabitCalendar