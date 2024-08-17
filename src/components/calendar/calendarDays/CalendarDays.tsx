import './CalendarDays.css'
import useCalendarState from '../../../state/calendarState';

const CalendarDays = () => {

  const currentDate = new Date(useCalendarState(state => state.currentDate));
  const selectedDate = new Date(useCalendarState(state => state.selectedDate));
  const setSelectedDate = useCalendarState(state => state.setSelectedDate);
  const daysInMonth = new Date(new Date().getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const dayCell = (day: number, currentDate: Date, selectedDate: Date) => {

    const isCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() === new Date().toDateString();
    const isSelecteDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toDateString() === selectedDate.toDateString();

    const getDayCellClass = (isCurrentDate: boolean, isSelecteDate: boolean) => {
      const classes = []
      if (isCurrentDate) {
        classes.push('calendarDays__day--current ');
      }
      if (isSelecteDate) {
        classes.push('calendarDays__day--selected ');
      }
      return classes.join(' ');
    }

    return <td 
              onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString())} 
              className={getDayCellClass(isCurrentDate, isSelecteDate)}
              key={day}>
                {day}
            </td>
  }

  const emptyDayCell = (day: number) => <td key={`${day}-empty`} className='calendarDays__emptyCell'></td>
 
  const renderDays = () => {
    const rows = [];
    const numberOfSkippedDays = new Date(new Date().getFullYear(), currentDate.getMonth(), 1).getDay() - 1 < 0 ? 6 : new Date(new Date().getFullYear(), currentDate.getMonth(), 1).getDay() - 1;

    const rowsCount = Math.ceil((daysInMonth + numberOfSkippedDays) / 7);


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