'use client'
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from 'react'

const SignUp = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);

    const handleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await axios.post("/api/register",{
            username: username,
            email: email,
            password: password,
        });

        if (response.status === 201 || response.status === 200) {
            router.push("/login");
        } else{
            setAlert(true);
        } 
        
        setUsername("");
        setEmail("");
        setPassword("");
    }
  return (
    <div className="form-container sign-up-container">
                <form className="form" action="#">
                    <h1 className="form-title-singin">Create Account</h1>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type='button' className="form-button">Sign Up</button>
                </form>
            </div>
  )
}

export default SignUp
