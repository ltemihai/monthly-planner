import useCalendarState from '../../state/calendarState';
import './Notes.css'

const Notes = () => {
    const selectedDate = useCalendarState(state => state.selectedDate);
    const notes = useCalendarState(state => state.notes)[selectedDate] || [];
    const setNotes = useCalendarState(state => state.setNotes);
    return (
        <section>
            <h2>Notes</h2>
            <textarea placeholder='Enter notes here...' value={notes} onChange={(value) => setNotes(selectedDate, value.target.value)}></textarea>
        </section>
    )
}

export default Notes