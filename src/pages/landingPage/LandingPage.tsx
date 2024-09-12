import React from 'react';
import Button from '../../components/shared/button/Button';
import useLandingPage from '../../state/landingPageState';
import './LandingPage.css';

const LandingPage: React.FC = () => { 

    const landingPageState = useLandingPage();

    const handleGetStarted = () => {
        landingPageState.setHasPassedFirstTime(true);
    }

    return (
        <span className='landingPage'>
            <span className='landingPage__container'>
                <h1>Welcome to the Dayboard!</h1>
                <div className='landingPage__container__links'><p><a href='https://github.com/ltemihai/monthly-planner'>Github</a></p> <p><a href='https://github.com/ltemihai/monthly-planner/wiki'>Docs</a></p> <p><a href='/'>Buy me a coffe</a></p></div>
                <div className='landingPage__container__text'>
                    <p>I'll try to keep it short</p>
                    <p>I've build this app for me. All the apps that I've used in the past for capturing ideas (Notion, Obsidian, Todoist, Evernote, OneNote) have way too many features for me.</p>
                    <p>I wish there's a way where I could strip them from functionalities. And that's not possible.</p>
                    <p>So here I am, building this app that acts as a first point of contact for my knowledge base.</p>
                    <p>It's simple, it's fast, and it got a personal touch.</p>
                    <p>How much would you ask? Free of charge!</p>
                    <p>Instead, I have two propositions for you:</p>
                    <p>- You can buy me a coffe if you found the app useful and want to support me.</p>
                    <p>- Or, I would really appriciate if you can support this humanitarian cause.</p><div className='landingPage__container__buttons'><Button text='Get Started' onClick={() => handleGetStarted()}/></div>
                </div>


            </span>
        </span>
    );
};

export default LandingPage;
