import '../styles/App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"

// Mobile
import MobileHome from '../pages/MobileHome'
import MobileSearch from '../pages/MobileSearch'
import MobileNewPost from '../pages/MobileNewPost'
import MobileProfile from '../pages/MobileProfile'

// Desktop

// Other
import NoPage from '../pages/NoPage'

// Firebase
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDu7SiKmJqUD21ja3_skiS7D_Z-OF0053c",
  authDomain: "social-media-app-fcc1f.firebaseapp.com",
  projectId: "social-media-app-fcc1f",
  storageBucket: "social-media-app-fcc1f.appspot.com",
  messagingSenderId: "1063507743990",
  appId: "1:1063507743990:web:8b6b95ab0bd492ef80c8d7",
  measurementId: "G-YRJEKF6LLK"
}

const app = initializeApp({...firebaseConfig});
const database = getFirestore(app);

// Default Data
const communities = []
const userID = "d5WUVQmvi8nY0E9rKVDQ"

function App() {
  const imagesPreload = ['../../placeholders/home.svg', '../../placeholders/home-selected.svg', '../../placeholders/search.svg', '../../placeholders/search-selected.svg', '../../placeholders/group.svg', '../../placeholders/group-selected.svg', '../../placeholders/person.svg', '../../placeholders/person-selected.svg', ]

  let [posts, setPosts] = useState([])
  let [user, setSetUser] = useState([])

  useEffect(() => {
    let mounted = true
    mounted && getDocs(collection(database, 'posts')).then(async postData => {

      await await Promise.all(postData.docs.map(async document => {
          let docData = document.data()
          let user = await getDoc(doc(database, 'users', docData.user))
          docData.user = user.data()
          return { id: document.id, data: docData }
      })).then(posts => {
        setPosts(posts)
        return () => mounted = false
      })
    })
  }, [])

  // Current User
  useEffect(() => {
    let mounted = true
    getDoc(doc(database, 'users', userID)).then(document => {
      mounted && setSetUser({ id: document.id, data: document.data() })
      return () => mounted = false
    })
  }, [])


  useEffect(() => {
    imagesPreload.forEach((image) => {
      const newImage = new Image();
      newImage.src = image;
      window[image] = newImage;
    });
  })

  return (
    <div className="App">
      {
        (window.innerWidth <= 1000 && /* Not Responsive */
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<MobileHome posts={posts} user={user} />} />
            <Route index path='/search' element={<MobileSearch posts={posts} user={user} communities={communities} database={database} />} />
            <Route index path='/post' element={<MobileNewPost user={user} database={database} />} />
            <Route path='/profile' element={<MobileProfile />} />
            <Route path='/profile/:page' element={<MobileProfile />} />

            <Route path="*" element={<NoPage />} />
          </Routes>

        </BrowserRouter>)

        ||

        <p style={{color: '#fff'}}>Desktop View Is Not Yet Supported</p>
      }
    </div>
  );
}

export default App;
