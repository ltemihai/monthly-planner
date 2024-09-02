import Diary from './pages/diary/Diary'
import LandingPage from './pages/landingPage/LandingPage';
import useLandingPage from './state/landingPageState';
import './App.css';
import Toast from './components/shared/toast/Toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeaturesBar from './components/featuresBar/featuresBar';
import NavigationHeader from './components/navigationHeader/NavigationHeader';
import Board from './pages/board/Board';

const App = () => {

  const landingPageState = useLandingPage();

  return (
    <div>
      <Router>
        <Toast></Toast>
        {!landingPageState.hasPassedFirstTime && <div className='overlay'> <LandingPage /> </div>}
        <FeaturesBar/>
        <NavigationHeader />
        <Routes>
          <Route path='/' Component={Diary} />
          <Route path='/board' Component={Board} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App