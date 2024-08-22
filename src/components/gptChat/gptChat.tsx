import React, { useState } from 'react';
import './gptChat.css';
import { FaPaperPlane } from 'react-icons/fa6';
import GptService from '../../services/gptService';

const GptChat: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleMessageSend();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value);
    };

    const handleMessageSend = () => {
        setLoading(true);
        GptService().generateText(inputValue).then((response) => {
            setTextareaValue(response);
            setInputValue('');
            setLoading(false);
        })
    }

    return (
        <div>
            <h2>GPT</h2>
            <div className='gpt-input-container'>
                <input 
                readOnly={loading}
                disabled={loading}
                className='gpt-input' 
                placeholder='Ask GPT a question' 
                value={inputValue}
                onChange={handleInputChange} 
                onKeyUp={handleKeyPress} />
                <FaPaperPlane className={`icon ${loading ? 'loading' : 'enabled'}`} onClick={() => handleMessageSend()}/>
            </div>
            
            <textarea className='gpt-textarea' readOnly={true} value={textareaValue} onChange={handleTextareaChange} />
        </div>
    );
};

export default GptChat;