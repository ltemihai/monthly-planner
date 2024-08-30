import { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, icon }: ButtonProps) => (
    <button className='btn pointer'
        onClick={onClick}>
        {icon && <span className='icon'>{icon}</span>}
        {text}
    </button> 
);

export default Button;
