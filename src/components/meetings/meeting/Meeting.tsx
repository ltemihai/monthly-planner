import './Meeting.css'

type MeetingProps = {
    meetingId: string;
    date: string;
    startDate: string;
    endDate: string;
    name: string;
}

const Meeting = (props: MeetingProps) => {
  return (
    <div className='meeting'>
        <h3>{props.name}</h3>
        <p>{props.startDate} - {props.endDate}</p>
    </div>
  )
}

export default Meeting