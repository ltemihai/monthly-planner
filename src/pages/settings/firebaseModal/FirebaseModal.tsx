import React, { useState } from 'react';
import './FirebaseModal.css';
import { FirebaseConfig } from '../../../types/firebase.types.ts';

interface FirebaseModalProps {
    onClose?: () => void;
    onSave: (config: FirebaseConfig) => void;
}



const FirebaseModal: React.FC<FirebaseModalProps> = ({ onClose, onSave }) => {
    const [apiKey, setApiKey] = useState('');
    const [authDomain, setAuthDomain] = useState('');
    const [projectId, setProjectId] = useState('');
    const [storageBucket, setStorageBucket] = useState('');
    const [messagingSenderId, setMessagingSenderId] = useState('');
    const [appId, setAppId] = useState('');
    const [measurementId, setMeasurementId] = useState('');

    const handleSave = () => {
        const config: FirebaseConfig = {
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
            measurementId,
        };
        onSave(config);
    };

    const isButtonDisabled = !apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId || !measurementId;

    return (
        <div className="modal">
            <h2>Connect to Firestore</h2>
            <label className='modal__label'>
                API Key:
                <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </label>
            <label className='modal__label'>
                Auth Domain:
                <input type="text" value={authDomain} onChange={(e) => setAuthDomain(e.target.value)} />
            </label>
            <label className='modal__label'>
                Project ID:
                <input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
            </label>
            <label className='modal__label'>
                Storage Bucket:
                <input type="text" value={storageBucket} onChange={(e) => setStorageBucket(e.target.value)} />
            </label>
            <label className='modal__label'>
                Messaging Sender ID:
                <input type="text" value={messagingSenderId} onChange={(e) => setMessagingSenderId(e.target.value)} />
            </label>
            <label className='modal__label'>
                App ID:
                <input type="text" value={appId} onChange={(e) => setAppId(e.target.value)} />
            </label>
            <label className='modal__label'>
                Measurement ID:
                <input type="text" value={measurementId} onChange={(e) => setMeasurementId(e.target.value)} />
            </label>
            <div className="modal__buttons">
                <button onClick={onClose}>Cancel</button>
                <button disabled={isButtonDisabled} onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default FirebaseModal;
