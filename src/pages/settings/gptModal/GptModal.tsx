import React, { useState } from 'react';
import './GptModal.css';

interface GptModalModalProps {
    onSave: (config: GptModalConfig) => void;
}

export interface GptModalConfig {
    apiKey: string;
}

const GptModal: React.FC<GptModalModalProps> = ({ onSave }) => {
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
            <label className='modal__label'>
                API Key:
                <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </label>
            <div className="modal__buttons">
                <button disabled={!apiKey} onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default GptModal;
