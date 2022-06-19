import MobileProfileBanner from '../components/MobileProfileBanner'
import MobileProfileOverlay from '../components/MobileProfileOverlay'
import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"
import { getDoc, doc, where, getDocs, query, collection } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { Helmet } from 'react-helmet'

import { auth, database, storage } from '../root/App'


function MobileProfile() {
  const [signedIn, loading] = useAuthState(auth)
  
  let [user, setSetUser] = useState(null)
  let [posts, setPosts] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && signedIn) {
      getDoc(doc(database, 'users', signedIn.uid)).then(document => {
       setSetUser({ id: document.id, data: document.data() })
       if (!document.exists()) {
        navigate('/setup')
       }
      })
      getDocs(query(collection(database, 'posts'), where('user', '==', signedIn.uid))).then(async postData => {
        await await Promise.all(postData.docs.map(async document => {
          let docData = document.data()
          let images = await Promise.all(docData.images.map(async image => {return await getDownloadURL(ref(storage, `posts/${image}`))}))
          docData.images = images
          return { id: document.id, data: docData }
        })).then(posts => {
          setPosts(posts)
        })
      })
    }
  }, [signedIn, loading, navigate])

  useEffect(() => {
    if (!loading) {
      if (!signedIn) {
        navigate('/')
      }
    }
  }, [signedIn, loading, navigate])

  return (
    <div className="MobileProfile">
      <Helmet>
        <title>{user.data.username} | Social Media App</title>
      </Helmet>
      {
        user && <>
        <MobileProfileBanner user={user} />
        <MobileProfileOverlay user={user} posts={posts} />
        <MobileNavigationBar />
        </>
      }
    </div>
  );
}

export default MobileProfile;