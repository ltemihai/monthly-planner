import useCalendarState from '../../state/calendarState';
import useFirebaseState from '../../state/firesbaseState';
import './Notes.css'

const Notes = () => {

    const setNotes = useCalendarState(state => state.setNotes);
    const selectedDate = useCalendarState(state => state.selectedDate);
    const setSyncing = useFirebaseState(state => state.setSyncing);

    const notes = useCalendarState(state => state.notes)[selectedDate] || [];

    const handleOnAddNoteButton = (selectedDate: string, text: string) => {
        setNotes(selectedDate, text)
        setSyncing(true);
    }
    return (
        <section>
            <h2>Notes</h2>
            <textarea placeholder='Enter notes here...' value={notes} onChange={(value) => handleOnAddNoteButton(selectedDate, value.target.value)}></textarea>
        </section>
    )
}

export default Notes