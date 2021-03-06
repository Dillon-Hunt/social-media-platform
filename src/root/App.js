import '../styles/App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useEffect } from "react"
import { HelmetProvider } from 'react-helmet-async'
import useOnlineStatus from '@rehooks/online-status';

// Mobile
import MobileSignIn from '../pages/MobileSignIn';
import MobileAccountSetup from '../pages/MobileAccountSetup';
import MobileHome from '../pages/MobileHome'
import MobileSearch from '../pages/MobileSearch'
import MobileNewPost from '../pages/MobileNewPost'
import MobileFriends from '../pages/MobileFriends'
import MobileChat from '../pages/MobileChat'
import MobileCommunity from '../pages/MobileCommunity'
import MobileProfile from '../pages/MobileProfile'
import MobileUserProfile from '../pages/MobileUserProfile'

// Desktop

// Other
import NoPage from '../pages/NoPage'

// Firebase
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';

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

  const isOnline = useOnlineStatus()

  const [signedIn, loading] = useAuthState(auth)

  useEffect(() => {
    if (!loading) {
      if (signedIn) {
        console.log(`Hello ${signedIn.displayName}!`)
      } 
    }
  }, [signedIn, loading])

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
              
              {
                signedIn === null ?
                <>
                  <Route path="*" element={<MobileSignIn signedIn={signedIn} />} />
                </>

                :

                <>
                  <Route index path="/" element={<MobileSignIn signedIn={signedIn} />} />
                  <Route path='/setup' element={<MobileAccountSetup signedIn={signedIn} />} />
                  <Route path='/home' element={<MobileHome signedIn={signedIn} />} />
                  <Route path='/search' element={<MobileSearch signedIn={signedIn} communities={communities} />} />
                  <Route path='/post' element={<MobileNewPost signedIn={signedIn} />} />
                  <Route path='/messages' element={<MobileFriends signedIn={signedIn} />} />
                  <Route path='/chats/:chatId' element={<MobileChat signedIn={signedIn} />} />
                  <Route path='/community/:communityId' element={<MobileCommunity signedIn={signedIn} />} />
                  <Route path='/profile' element={<MobileProfile signedIn={signedIn} />} />
                  <Route path='/profile/:page' element={<MobileProfile signedIn={signedIn} />} />
                  <Route path='/users/:username' element={<MobileUserProfile signedIn={signedIn} />} />
                  <Route path="*" element={<NoPage />} />
                </>
              }
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      }
      {
        // Add a "Reconnected To Internet Popup"
        <div className='NoInternet' isonline={isOnline.toString()}><img className='NoInternet__Image' src="../../assets/error.svg" alt=""/><p className='NoInternet__Text'>No Internet Connection</p></div>
      }
    </div>
  );
}

export default App;
