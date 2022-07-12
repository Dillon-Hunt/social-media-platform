import '../styles/MobileSignIn.css'

import React, { useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'

import { auth } from '../root/App'

const provider = new GoogleAuthProvider();

function SignInButton() {

  const navigate = useNavigate()

  const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          if (result._tokenResponse.isNewUser) {
            navigate('/setup')
          } else {
            navigate('/')
            // logEvent(analytics, 'sign_in')
          }
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


function MobileSignIn(props) {
  const { signedIn } = props
  const path = window.location.pathname

  const navigate = useNavigate()

  useEffect(() => {
    if (path !== '/') {
      navigate('/')
    }
  }, [path, navigate])

  useEffect(() => {
    if (signedIn) {
      navigate('/home')
    }
  }, [signedIn, navigate])

  return (
      <div>
          <Helmet>
              <title>Sign In</title>
              <meta name="description" content="Sign in or sign up here" />
          </Helmet>
          <h1 className="MobileSignIn__Text">Social Media App</h1>
          <SignInButton />
          {/* <SignOutButton /> */}
      </div>
  )
}

export default MobileSignIn