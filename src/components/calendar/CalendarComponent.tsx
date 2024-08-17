import CalendarHeader from './calendarHeader/CalendarHeader'
import CalendarDays from './calendarDays/CalendarDays'
import './CalendarComponent.css'

const CalendarComponent = () => {

  return (
    <section>
        <CalendarHeader/>
        <CalendarDays />
    </section>
  )
}

export default CalendarComponent