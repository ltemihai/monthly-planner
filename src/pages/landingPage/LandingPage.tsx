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
                <h1>Welcome to the Landing Page!</h1>
                <p>This is the starting point of your application.</p>
                <Button text='Get Started' onClick={() => handleGetStarted()} />
            </span>
        </span>
    );
};

export default LandingPage;