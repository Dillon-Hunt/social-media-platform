import '../styles/MobileSignIn.css'

import React, { useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { initializeApp } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"

const firebaseConfig = {
    apiKey: "AIzaSyDu7SiKmJqUD21ja3_skiS7D_Z-OF0053c",
    authDomain: "social-media-app-fcc1f.firebaseapp.com",
    projectId: "social-media-app-fcc1f",
    storageBucket: "social-media-app-fcc1f.appspot.com",
    messagingSenderId: "1063507743990",
    appId: "1:1063507743990:web:8b6b95ab0bd492ef80c8d7",
    measurementId: "G-YRJEKF6LLK"
}

const app = initializeApp({...firebaseConfig})
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

function SignInButton() {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
          .then(() => {

          }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message

            console.log(errorCode, errorMessage)
        })
    }
  
    return (
      <button className="MobileSignIn__Button" onClick={signInWithGoogle}>
        <img src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'} alt='' /> 
        <p className='MobileSignIn__Button__Text'>Sign in with Google</p>
      </button>
    )
}

export function SignOutButton() {
    const SignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed Out')
          }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
          })
    }
  
    return (
      <button className="SignOutButton" onClick={SignOut}>
        Sign Out
      </button>
    )
}


function MobileSignIn() {
    const navigate = useNavigate()

    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            navigate('/setup')
        }
    })

    return (
        <div>
            <h1 className="MobileSignIn__Text">Social Media App</h1>
            <SignInButton />
            {/* <SignOutButton /> */}
        </div>
    )
}

export default MobileSignIn