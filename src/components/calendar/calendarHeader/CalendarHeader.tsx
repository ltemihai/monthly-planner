import './CalendarHeader.css'
import useCalendarState from '../../../state/calendarState'

const CalendarHeader = () => {
 
  const currentMonth = new Date(useCalendarState(state => state.currentDate));
  const setCurrentDate = useCalendarState(state => state.setCurrentDate);
  const setSelectedDate = useCalendarState(state => state.setSelectedDate);

  const handleIncrementMonth = () => {
    const month = new Date(currentMonth);
    month.setMonth(month.getMonth() + 1);
    setCurrentDate(month.toDateString());
    setSelectedDate(month.toDateString());
  };
  
  const handleDecrementMonth = () => {
    const month = new Date(currentMonth);
    month.setMonth(month.getMonth() - 1);
    setCurrentDate(month.toDateString());
    setSelectedDate(month.toDateString());
  };

  const handleToday = () => {
    setCurrentDate(new Date().toDateString());
    setSelectedDate(new Date().toDateString());
  }

  return (
    <div className='calendarHeader'>
      <h2>{`${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()} `}</h2>
  
      <div className='calendarHeader__buttons'>
        <button className='calendarHeader__buttons__today' onClick={() => handleToday()}>Today</button>
        <button onClick={() => handleDecrementMonth()}>Previous</button>
        <button onClick={() => handleIncrementMonth()}>Next</button>
      </div>
    </div>
  )
}

export default CalendarHeader