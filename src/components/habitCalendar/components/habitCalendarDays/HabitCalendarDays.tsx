import { getDaysInMonth, getNumberOfCalnedarRows, getSkippedDaysInMonth } from "../../../../helpers/calendar.helpers";
import useCalendarState from "../../../../state/calendarState";
import './HabitCalendarDays.css';
import HabitDayCell from "../habitDayCell/HabitDayCell.tsx";

const HabitCalendarDays = () => {
    const currentDate = new Date(useCalendarState(state => state.currentDate));
    const daysInMonth = getDaysInMonth(currentDate);

    const emptyDayCell = (day: number) => <td key={`${day}-empty`} className='habitDays__emptyCell'></td>

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
            days.push(HabitDayCell(currentDate, i));
          }
        }
        else {
          for (let i = 0; i < 7; i++) {
            if ((i + rowIndex * 7) - numberOfSkippedDays + 1 > daysInMonth) {
              break;
            }
            days.push(HabitDayCell(currentDate, (i + rowIndex * 7) - numberOfSkippedDays + 1));
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

export default HabitCalendarDays
