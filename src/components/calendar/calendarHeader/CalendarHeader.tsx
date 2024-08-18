import './CalendarHeader.css'
import useCalendarState from '../../../state/calendarState'
import { FaAngleLeft, FaAngleRight, FaCalendarDay } from "react-icons/fa6";

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
      <FaAngleLeft className='pointer' onClick={() => handleDecrementMonth()} />
      <div className='calendarHeader__text'>
        <h2>{`${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()} `}</h2>
        <FaCalendarDay className='pointer' onClick={() => handleToday()} />
      </div>
      <FaAngleRight className='pointer' onClick={() => handleIncrementMonth()} />
    </div>
  )
}

export default CalendarHeader