import React, { useState } from 'react';
import './FirebaseModal.css';

interface FirebaseModalProps {
    onClose: () => void;
    onSave: (config: FirebaseConfig) => void;
}

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
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