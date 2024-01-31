import React, { Component } from 'react';

interface Props {
    handleClickSignUpButton(event: any): void;
    handleClickSignInButton(event: any): void;
}

class Overlay extends Component<Props> {
    render() {
        const { handleClickSignUpButton, handleClickSignInButton } = this.props;
        return (
            <div className="overlay-container">
                <div className="overlay">
                <img src='/assets/logo2 2.png' alt="logo" width={180} className='p-4'/>
                    <div className="overlay-panel overlay-left">
                       <h1>Welcome Back!</h1>
                        <p className="overlay-description">
                            To keep connected with us,<br/>
                            please login with your personal info.
                        </p>
                        <button
                            className="ghost form-button"
                            id="signIn"
                            onClick={handleClickSignInButton}
                        >Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p className="overlay-description">
                            Enter your personal details,<br/>
                            and start journey with us.
                        </p>
                        <button
                            className="ghost form-button"
                            id="signUp"
                            onClick={handleClickSignUpButton}
                        >Sign Up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Overlay;