import CalendarApp from './components/calendarApp/CalendarApp'
import LandingPage from './pages/landingPage/LandingPage';
import useLandingPage from './state/landingPageState';
import './App.css';
import Toast from './components/shared/toast/Toast';

const App = () => {

  const landingPageState = useLandingPage();

  return (
    <div>
      <Toast></Toast>
      {!landingPageState.hasPassedFirstTime && <div className='overlay'> <LandingPage /> </div>}
      <CalendarApp />
    </div>
  )
}

export default App