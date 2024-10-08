import LandingPage from "../landingPage/LandingPage.tsx";
import FeaturesBar from "../../components/featuresBar/featuresBar.tsx";
import {SideMenu} from "../../components/sideMenu/sideMenu.tsx";
import NavigationHeader from "../../components/navigationHeader/NavigationHeader.tsx";
import {Route, Routes} from "react-router-dom";
import Diary from "../diary/Diary.tsx";
import Board from "../board/Board.tsx";
import {useIsMobile} from "../../helpers/layout.helpers.ts";
import useLandingPage from "../../state/landingPageState.tsx";
import {useMenu} from "../../contexts/sideMenu.context.tsx";
import {Settings} from "../settings/Settings.tsx";
import './entryPage.css';
import HabitTracker from "../habitTracker/HabitTracker.tsx";

export const EntryPage = () => {

    const isMobile = useIsMobile();
    const { isMenuOpen } = useMenu();

    const landingPageState = useLandingPage(state => state.hasPassedFirstTime);

    return (

        <div className="entry-page">
            { isMenuOpen ? <SideMenu ></SideMenu> : <div>
                {!landingPageState && <div className='overlay'><LandingPage/></div>}
                {!isMobile && <FeaturesBar/>}
                <NavigationHeader/>
                <Routes>
                    <Route path='/' Component={Diary}/>
                    <Route path='/board' Component={Board}/>
                    <Route path='/settings' Component={Settings}/>
                    <Route path='/habitTracker' Component={HabitTracker}/>
                </Routes>
            </div>
            }

        </div>
    )
}
