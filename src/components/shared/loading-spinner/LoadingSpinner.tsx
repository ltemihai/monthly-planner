import React from 'react';
import './LoadingSpinner.css';
import { Tooltip } from 'react-tooltip'

interface LoadingSpinnerProps {
    tooltipText?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ tooltipText }) => {
    return (
        <div>
            <div className="loading-spinner" 
            data-tooltip-content={tooltipText}
            data-tooltip-place='bottom' 
            data-tooltip-id="loading-spinner-tooltip">
                <div className="spinner"></div>
            </div>
            {tooltipText && <Tooltip id="loading-spinner-tooltip"/>}
        </div>
        
    );
};

export default LoadingSpinner;