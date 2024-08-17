import useCalendarState from "../../state/calendarState"
import Meeting from "./meeting/Meeting"
import './Meetings.css'


const Meetings = () => {

    const selectedDate = useCalendarState(state => state.selectedDate)
    const meetings = useCalendarState(state => state.meetings)[selectedDate] || []

    return (
        <section>
            <h2>Meetings</h2>
            <ul className="meetings">
                {meetings.length === 0 ? (
                    <p>No meetings found.</p>
                ) : (
                    meetings.map(meeting => <Meeting
                        key={meeting.id}
                        meetingId={meeting.id}
                        date={meeting.date}
                        startDate={meeting.startDate}
                        endDate={meeting.endDate}
                        name={meeting.name}
                    />)
                )}
            </ul>
        </section>
    )
}

export default Meetings