'use client'
import { redirect } from 'next/dist/server/api-utils';
import React, { Component } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";


const LoginForm = () => {
  const router = useRouter();

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const [alert, setAlert] = useState(false)
//   const handleLogin = async(e:SyntheticEvent) => {
//     e.preventDefault();

//     const signInData = await signIn('credentials', {
//       email: email,
//       password: password,
//       redirect: false,
//   })

//   if(signInData?.error){
//     setAlert(true)
//   }else {
//     setAlert(false);
//   }

//   setEmail("")
//     setPassword("")
// }

    return (
    <div className="form-container sign-in-container">
    <img src='/assets/logo2 2.png' alt="logo" width={180} className='p-4'/>
    <form className="form-signin">
        <h1 className="form-title-singin">Sign In to InCube!</h1>
       
        {/* {alert &&
        <div role="alert" className="alert alert-error fixed bottom-10 right-10 max-w-96 self">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-white shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">Email atau password salah</span>
        </div>
    } */}

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

       <button type='button' onClick={()=> router.push('/')} className="form-button">Sign In</button>
        <a className="find-password" href="#">Forget Password</a>
    </form>
</div>
  );
}

export default LoginForm