import '../styles/App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useEffect } from "react"
import { HelmetProvider } from 'react-helmet-async'

// Firebase
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDu7SiKmJqUD21ja3_skiS7D_Z-OF0053c",
  authDomain: "social-media-app-fcc1f.firebaseapp.com",
  projectId: "social-media-app-fcc1f",
  storageBucket: "social-media-app-fcc1f.appspot.com",
  messagingSenderId: "1063507743990",
  appId: "1:1063507743990:web:8b6b95ab0bd492ef80c8d7",
  measurementId: "G-YRJEKF6LLK"
}

export const app = initializeApp({...firebaseConfig});
export const database = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app)

// Mobile
const MobileSignIn = React.lazy(() => import('../pages/MobileSignIn'))
const MobileAccountSetup = React.lazy(() => import('../pages/MobileAccountSetup'))
const MobileHome = React.lazy(() => import('../pages/MobileHome'))
const MobileSearch = React.lazy(() => import('../pages/MobileSearch'))
const MobileNewPost = React.lazy(() => import('../pages/MobileNewPost'))
const MobileFriends = React.lazy(() => import('../pages/MobileFriends'))
const MobileChat = React.lazy(() => import('../pages/MobileChat'))
const MobileProfile = React.lazy(() => import('../pages/MobileProfile'))
const MobileUserProfile = React.lazy(() => import('../pages/MobileUserProfile'))

// Desktop

// Other
const NoPage = React.lazy(() => import('../pages/NoPage'))

// Default Data
const communities = []

function App() {
  const imagesPreload = ['../../assets/home.svg', '../../assets/home-selected.svg', '../../assets/search.svg', '../../assets/search-selected.svg', '../../assets/group.svg', '../../assets/group-selected.svg', '../../assets/person.svg', '../../assets/person-selected.svg', '../../assets/add-green.svg']

  useEffect(() => {
    imagesPreload.forEach((image) => {
      const newImage = new Image();
      newImage.src = image;
      window[image] = newImage;
    });
  })

  const [loggedIn, loading] = useAuthState(auth)

  useEffect(() => {
    if (!loading && loggedIn) {
      console.log(`Hello ${loggedIn.displayName}!`)
    }
  }, [loggedIn, loading])

  return (
    <div className="App">
      {
        /* Not Responsive */
        loading ?
        <p className='loading'>
          Loading...
        </p>

        :
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route index path='/' element={<MobileSignIn />} />
              <Route path='/setup' element={<MobileAccountSetup />} />
              <Route path='/home' element={<MobileHome />} />
              <Route path='/search' element={<MobileSearch communities={communities} />} />
              <Route path='/post' element={<MobileNewPost />} />
              <Route path='/friends' element={<MobileFriends />} />
              <Route path='/chats/:chatId' element={<MobileChat />} />
              <Route path='/profile' element={<MobileProfile />} />
              <Route path='/profile/:page' element={<MobileProfile />} />
              <Route path='/users/:username' element={<MobileUserProfile />} />

              <Route path="*" element={<NoPage />} />
            </Routes>

          </BrowserRouter>
        </HelmetProvider>
      }
    </div>
  );
}

export default App;
