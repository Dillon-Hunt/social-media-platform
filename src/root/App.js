// import MediaQuery from 'react-responsive';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react"

// Mobile
import MobileHome from '../pages/MobileHome'
import MobileSearch from '../pages/MobileSearch'
import MobileProfile from '../pages/MobileProfile'

// Desktop

// Other
import NoPage from '../pages/NoPage'

import '../styles/App.css';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDu7SiKmJqUD21ja3_skiS7D_Z-OF0053c",
  authDomain: "social-media-app-fcc1f.firebaseapp.com",
  projectId: "social-media-app-fcc1f",
  storageBucket: "social-media-app-fcc1f.appspot.com",
  messagingSenderId: "1063507743990",
  appId: "1:1063507743990:web:8b6b95ab0bd492ef80c8d7",
  measurementId: "G-YRJEKF6LLK"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Dummy Data
let posts = [
  {
    data: {
      id: '00000001',
      time: "\"2022-06-13T07:56:18.538Z\"", /* JSON.stringify(new Date) */
      tags: [
        "Mountains",
        "Nature",
      ]
    },

    user: { /* This Will Just Be UserID in the future */
      id: '00000002',
      name: 'Dillon Hunt',
      username: 'Dillon_Hunt',
      profileIcon: '../../placeholders/1.jpg',
    },

    content: {
      images: [
        "../../placeholders/1.jpg",
      ],
      text: "Gorgeous mountain range over the country side down near the big THING everyone is talking about.",
    },

    response: {
      favorites: [
        '00000001', /* This data may be used to display 'recommended' accounts / posts */
        '00000002',
        '00000003',
        '00000004',
      ],
      comments: [
        {
          id: '00000001',
          user: "00000001",
          content: "Great Photo!",
          time: "\"2022-06-12T08:32:22.852Z\"",
          replying: false,
        }
      ],
    }
  },
  {
    data: {
      id: '00000002',
      time: "\"2022-06-12T07:56:18.538Z\"", /* JSON.stringify(new Date) */
      tags: [
        "Nature",
        "Photography"
      ]
    },

    user: { /* This Will Just Be UserID in the future */
      id: '00000003',
      name: 'Epic Gamer',
      username: 'EpicGamer69',
      profileIcon: '../../placeholders/1.jpg',
    },

    content: {
      images: [
        "../../placeholders/1.jpg",
      ],
      text: "Look at that mountain!",
    },

    response: {
      favorites: [
        '00000001', /* This data may be used to display 'recommended' accounts / posts */
        '00000002',
        '00000003',
      ],
      comments: [
        {
          id: '00000001',
          user: "00000001",
          content: "Awesome Photo!",
          time: "\"2022-06-12T08:32:22.852Z\"",
          replying: false,
        }
      ],
    }
  },
]

let user = {
  id: '00000001',
  name: 'Dillon Hunt',
  username: 'Dillon_Hunt',
  profileIcon: '../../placeholders/1.jpg',
  profileBanner: '../../placeholders/2.jpg',
  favorites: [
    '00000001'
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

function App() {
  const imagesPreload = ['../../placeholders/home.svg', '../../placeholders/home-selected.svg', '../../placeholders/search.svg', '../../placeholders/search-selected.svg', '../../placeholders/group.svg', '../../placeholders/group-selected.svg', '../../placeholders/person.svg', '../../placeholders/person-selected.svg', ];

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
            <Route index path='/search' element={<MobileSearch posts={posts} user={user} communities={communities} />} />
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
