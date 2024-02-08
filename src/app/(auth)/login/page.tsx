'use client'
import React, {Component} from 'react';
import '@/components/apacik.css';
import SignUp from '@/components/RegisterForm';
import SignIn from '@/components/LoginForm';
import Overlay from '@/components/Overlay';

interface State {
    rightPanelActive: boolean,
}

class App extends Component<{}, State> {
    
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            rightPanelActive: false,
        }
    }

    handleClickSignUpButton = () => this.setState({
        rightPanelActive: true,
    });

    handleClickSignInButton = () => this.setState({
        rightPanelActive: false,
    });

    render() {
        const { handleClickSignUpButton, handleClickSignInButton } = this;
        const { rightPanelActive } = this.state;
        
        return (
            <div className="App">
                <div
                    className={`container ${rightPanelActive ? `right-panel-active` : ``}`}
                    id="container"
                >
                    <SignUp />
                    <SignIn />
                    <Overlay
                        handleClickSignInButton={handleClickSignInButton}
                        handleClickSignUpButton={handleClickSignUpButton}
                    />
                </div>
            </div>
        );
    }
}

export default App;
