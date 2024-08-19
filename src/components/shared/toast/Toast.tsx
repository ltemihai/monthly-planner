import React from 'react';
import './Toast.css';
import useToastStore from '../../../state/toastState';
import { ToastEnum } from '../../../enums/toast.enum';
import { MdOutlineClose } from 'react-icons/md';
import { CiSquareInfo, CiWarning } from "react-icons/ci";
import { FaCheck } from 'react-icons/fa6';
import { VscError } from "react-icons/vsc";



const Toast: React.FC = () => {

    const { toasts, removeToast } = useToastStore();

    const getIcon = (type?: ToastEnum) => {
        switch (type) {
            case ToastEnum.INFO:
                return <CiSquareInfo />
            case ToastEnum.SUCCESS:
                return <FaCheck />
            case ToastEnum.ERROR:
                return <VscError />;
            case ToastEnum.WARNING:
                return <CiWarning />;
            default:
                return <CiSquareInfo />
        }
    }

    return (
      <span className='toast'>
        {toasts.map((toast) => (
          <div key={toast.id} className='toast__container'>
            <div className='toast__icon'>
              {getIcon(toast.type)}
            </div>
            <p>{toast.message}</p>
            <MdOutlineClose className='pointer' onClick={() => removeToast(toast.id)}></MdOutlineClose>
          </div>
        ))}
      </span>
    );
};

export default Toast;