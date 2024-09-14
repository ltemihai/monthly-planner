import './CalendarDays.css'
import useCalendarState from '../../../state/calendarState';
import { getDaysInMonth, getNumberOfCalnedarRows, getSkippedDaysInMonth, isSameDate } from '../../../helpers/calendar.helpers';
const CalendarDays = () => {

  const currentDate = new Date(useCalendarState(state => state.currentDate));
  const selectedDate = new Date(useCalendarState(state => state.selectedDate));
  const setSelectedDate = useCalendarState(state => state.setSelectedDate);
  const daysInMonth = getDaysInMonth(currentDate);

  const dayCell = (day: number, currentDate: Date, selectedDate: Date) => {

    const isCurrentDateSelected = isSameDate(currentDate, new Date(), day);
    const isSelectedDateSelected = isSameDate(selectedDate, selectedDate, day);

    const getDayCellClass = (isCurrentDateSelected: boolean, isSelecteDate: boolean) => {
      const classes = ['pointer']
      if (isCurrentDateSelected) {
        classes.push('calendarDays__day--current ');
      }
      if (isSelecteDate) {
        classes.push('calendarDays__day--selected ');
      }
      return classes.join(' ');
    }

    return <td 
              onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString())} 
              className={getDayCellClass(isCurrentDateSelected, isSelectedDateSelected)}
              key={day}>
                {day}
            </td>
  }

  const emptyDayCell = (day: number) => <td key={`${day}-empty`} className='calendarDays__emptyCell'></td>
 
  const renderDays = () => {
    const rows = [];
    const numberOfSkippedDays = getSkippedDaysInMonth(currentDate);

    const rowsCount = getNumberOfCalnedarRows(daysInMonth, numberOfSkippedDays);

    for (let i = 0; i <= rowsCount ; i++) { 
        rows.push(<tr key={i}>
          {renderRow(i, numberOfSkippedDays)}
        </tr>);
    }
    return rows; 
  };

  const renderRow = (rowIndex: number, numberOfSkippedDays: number) => {
    const days = [];
    if (rowIndex === 0) {
      for (let i = 0; i < numberOfSkippedDays; i++) {
        days.push(emptyDayCell(i));
      }
      for (let i = 1; i <= 7 - numberOfSkippedDays; i++) {
        days.push(dayCell(i, currentDate, selectedDate));
      }
    }
    else {
      for (let i = 0; i < 7; i++) {
        if ((i + rowIndex * 7) - numberOfSkippedDays + 1 > daysInMonth) {
          break;
        }
        days.push(dayCell((i + rowIndex * 7) - numberOfSkippedDays + 1, currentDate, selectedDate));
      }
    }
    
    return days;
  } 

  return (
    <table>
      <thead>
        <tr>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
          <th>S</th>
        </tr>
      </thead>
      <tbody> 
        {renderDays()}
      </tbody>
    </table>
  );
}

export default CalendarDays;