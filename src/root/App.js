// import MediaQuery from 'react-responsive';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Mobile
import MobileHome from '../pages/MobileHome'
import MobileSearch from '../pages/MobileSearch'
import MobileProfile from '../pages/MobileProfile'

// Desktop

// Other
import NoPage from '../pages/NoPage'

import '../styles/App.css';

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore"

//import { getAuth } from 'firebase/auth', onAuthStateChange
//import { getDatabase } from "firebase/database"
/* 
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore' */

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

//const auth = getAuth(app)
const database = getFirestore(app);

const postsCollection = collection(database, 'posts')

// Dummy Data
let user = {
  id: '00000001',
  name: 'Dillon Hunt',
  username: 'Dillon_Hunt',
  profileIcon: '../../placeholders/1.jpg',
  profileBanner: '../../placeholders/2.jpg',
  favorites: [
    'lLvVVAhLXIEy3h0g6Qzk'
  ]
}

let communities = [
  { 
    data: {
      id: '00000001',
      tags: [
        'Gaming',
        'Fortnite',
        'Games',
      ],
      yearCreated: '2022',
    },
    name: 'Gaming',
    description: 'The top place to hang out with fellow gamers and discuss all things gaming!',
    banner: '../../placeholders/3.jpg',
    members: [
      '00000001', 
      '00000002',
    ],
    posts: [
      '00000001',
      '00000002',
      '00000001',
      '00000002',
      '00000001',
    ]
  },
  { 
    data: {
      id: '00000001',
      tags: [
        'Cats',
        'Animals',
        'Love',
      ],
      yearCreated: '2021',
    },
    name: 'Cool Cats',
    description: 'We love cats, cats and more cats. For all you cat needs join the Cool Cats.',
    banner: '../../placeholders/4.jpg',
    members: [
      '00000001', 
      '00000002',
    ],
    posts: [
      '00000001',
      '00000002',
      '00000001',
      '00000002',
      '00000001',
    ]
  },
  { 
    data: {
      id: '00000001',
      tags: [
        'Mountains',
        'Nature',
        'Hills',
      ],
      yearCreated: '2022',
    },
    name: 'Mountains',
    description: 'Explore the great outdoors from the comfort of you home with som awesome mountains.',
    banner: '../../placeholders/1.jpg',
    members: [
      '00000001', 
      '00000002',
      '00000001', 
      '00000002',
    ],
    posts: [
      '00000001',
      '00000002',
      '00000001',
    ]
  }
]

/* function SignIn() { 
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
   <button onclick={signInWithGoogle}>Sign In With Google</button>
  )
}

function SignOut() { 
  return auth.currentUser && (
   <button onclick={() => auth.signOut()}>Sign Out</button>
  )
} */

function App() {
  const imagesPreload = ['../../placeholders/home.svg', '../../placeholders/home-selected.svg', '../../placeholders/search.svg', '../../placeholders/search-selected.svg', '../../placeholders/group.svg', '../../placeholders/group-selected.svg', '../../placeholders/person.svg', '../../placeholders/person-selected.svg', ];

  //const [user] = useAuthState(auth)

  let [posts, setPosts] = useState([])

  useEffect(() => {
    let mounted = true
    getDocs(postsCollection).then(data => {
      mounted && setPosts(data.docs.map(doc => {return data = doc.data()}))
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
            <Route index path='/' element={<MobileHome posts={posts} user={user} database={database} />} />
            <Route index path='/search' element={<MobileSearch posts={posts} user={user} communities={communities} database={database} />} />
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
