import React, { ReactNode } from 'react';
import './Button.css';

type ButtonProps = {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
};

const Button = ({ text, onClick, icon }: ButtonProps) => (
    <button className='btn pointer'
        onClick={onClick}>
        {icon && <span className='icon'>{icon}</span>}
        {text}
    </button> 
);

export default Button;
