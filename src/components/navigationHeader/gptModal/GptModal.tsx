import React, { useState } from 'react';
import './GptModal.css';

interface GptModalModalProps {
    onClose: () => void;
    onSave: (config: GptModalConfig) => void;
}

export interface GptModalConfig {
    apiKey: string;
}

const GptModal: React.FC<GptModalModalProps> = ({ onClose, onSave }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSave = () => {
        const config: GptModalConfig = {
            apiKey,
        };
        onSave(config);
    };

    return (
        <div className="modal">
            <h2>Connect to ChatGPT</h2>
            <label>
                API Key:
                <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </label>
            <div className="modal-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default GptModal;