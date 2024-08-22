import CalendarApp from './components/calendarApp/CalendarApp'
import LandingPage from './pages/landingPage/LandingPage';
import useLandingPage from './state/landingPageState';
import './App.css';

const App = () => {

  const landingPageState = useLandingPage();

  return (
    <div>
      {!landingPageState.hasPassedFirstTime && <div className='overlay'> <LandingPage /> </div>}
      <CalendarApp />
    </div>
  )
}

export default App