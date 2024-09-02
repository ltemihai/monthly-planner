import './featuresBar.css'
import { CiViewBoard } from 'react-icons/ci'
import { SlNotebook } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

const FeaturesBar = () => {

    const navigate = useNavigate();

    return (
        <div className="features-bar">
            <div onClick={() => navigate('/')} className='pointer features-bar__container'>
                <SlNotebook className=' features-bar__icon' />
            </div>
            <div onClick={() => navigate('/board')} className='pointer features-bar__container'>
                <CiViewBoard className=' features-bar__icon' />
            </div>
            {/* <div onClick={() => navigate('/')} className='pointer features-bar__container'>
                <PiOpenAiLogoLight className='features-bar__icon' />
            </div> */}
        </div>
    )
}

export default FeaturesBar