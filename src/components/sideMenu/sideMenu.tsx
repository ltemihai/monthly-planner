import {useMenu} from "../../contexts/sideMenu.context.tsx";
import './sideMenu.css';
import {SlNotebook} from "react-icons/sl";
import {CiViewBoard} from "react-icons/ci";
import {useNavigate} from "react-router-dom";

export const SideMenu = () => {
    const { toggleMenu } = useMenu();
    const navigate = useNavigate();

    const navigateToLink = (url: string) => {
        navigate(url);
        toggleMenu()
    }

    return (<div className="sidemenu">
            <h1>Dayboard</h1>
            <menu className="sidemenu__entries">
                <div className="sidemenu__entries__row" onClick={() => navigateToLink('/')}>
                    <SlNotebook className='features-bar__icon'/>
                    <div>Journal</div>
                </div>
                <div className="sidemenu__entries__row" onClick={() => navigateToLink('/board')}>
                    <CiViewBoard className=' features-bar__icon'/>
                    <div>Board</div>
                </div>
            </menu>
        </div>
        )
        }
