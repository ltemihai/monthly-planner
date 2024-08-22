import React, { useState } from 'react';
import './FirebaseModal.css';
import { FirebaseConfig } from '../../../types/firebase.types';

interface FirebaseModalProps {
    onClose: () => void;
    onSave: (config: FirebaseConfig) => void;
}



const FirebaseModal: React.FC<FirebaseModalProps> = ({ onClose, onSave }) => {
    const [apiKey, setApiKey] = useState('AIzaSyCyTNlG-5xISaYMMDyS2z80Vq9JaLl7bcs');
    const [authDomain, setAuthDomain] = useState('the-board-a8261.firebaseapp.com');
    const [projectId, setProjectId] = useState('the-board-a8261');
    const [storageBucket, setStorageBucket] = useState('the-board-a8261.appspot.com');
    const [messagingSenderId, setMessagingSenderId] = useState('946105852688');
    const [appId, setAppId] = useState('1:946105852688:web:b5f577c0a0c58cc3f2fb95');
    const [measurementId, setMeasurementId] = useState('G-D05CQBRPGW');

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

    return (
        <div className="modal">
            <h2>Connect to Firestore</h2>
            <label>
                API Key:
                <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </label>
            <label>
                Auth Domain:
                <input type="text" value={authDomain} onChange={(e) => setAuthDomain(e.target.value)} />
            </label>
            <label>
                Project ID:
                <input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
            </label>
            <label>
                Storage Bucket:
                <input type="text" value={storageBucket} onChange={(e) => setStorageBucket(e.target.value)} />
            </label>
            <label>
                Messaging Sender ID:
                <input type="text" value={messagingSenderId} onChange={(e) => setMessagingSenderId(e.target.value)} />
            </label>
            <label>
                App ID:
                <input type="text" value={appId} onChange={(e) => setAppId(e.target.value)} />
            </label>
            <label>
                Measurement ID:
                <input type="text" value={measurementId} onChange={(e) => setMeasurementId(e.target.value)} />
            </label>
            <div className="modal-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default FirebaseModal;