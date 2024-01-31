'use client'
import React, { Component } from 'react';

class SignUp extends Component {
    render() {
        return (
            <div className="form-container sign-up-container">
                <form className="form" action="#">
                    <h1 className="form-title-singin">Create Account</h1>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button onClick={() => handlerLogin()} className="form-button">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
