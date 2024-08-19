import { useState } from 'react'
import './NavigationHeader.css'
import { FaCloud } from 'react-icons/fa6';
import FirebaseModal, { FirebaseConfig } from './modal/FirebaseModal';
import { FirebaseService, setFirebaseConfig } from '../../services/firebaseService';
import useCalendarState from '../../state/calendarState';

const NavigationHeader = () => {

  const calendarState = useCalendarState();
  const [showModal, setShowModal] = useState(false);

  const handleSync = async (config: FirebaseConfig) => {
    setFirebaseConfig(config);
    if (localStorage.getItem('firebaseConfig')) {
      FirebaseService().saveFirestoreConfig(calendarState);
    }
  };

  return (
    <header>
      <h1>The Board</h1>
      <FaCloud className='pointer' onClick={() => setShowModal(!showModal)}></FaCloud>
      {showModal && (
        <FirebaseModal onClose={() => setShowModal(false)} onSave={async (config) => await handleSync(config)}></FirebaseModal>
      )}
    </header>
  );
}

export default NavigationHeader  