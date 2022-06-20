import MobileHeader from '../components/MobileHeader'
import MobileStoriesView from '../components/MobileStoriesView'
import MobilePostsView from '../components/MobilePostsView'

import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc, query, orderBy, limit } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'

import { auth, database, storage } from '../root/App'

function MobileHome() {
  let [posts, setPosts] = useState(null)
  const [signedIn, loading] = useAuthState(auth)
  let [user, setSetUser] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && signedIn) {
      getDoc(doc(database, 'users', signedIn.uid)).then(document => {
       setSetUser({ id: document.id, data: document.data() })
       if (!document.exists()) {
        navigate('/setup')
       }
      })
    }
  }, [signedIn, loading, navigate])

  useEffect(() => {
      if (!loading) {
        if (signedIn) {
          getDocs(query(collection(database, 'posts'), orderBy("time", "desc"), limit(20))).then(async postData => {
            await await Promise.all(postData.docs.map(async document => {
              let docData = document.data()
              let user = await getDoc(doc(database, 'users', docData.user))
              let images = await Promise.all(docData.images.map(async image => {return await getDownloadURL(ref(storage, `posts/${image}`))}))
              docData.user = user.data()
              docData.images = images
              return { id: document.id, data: docData }
            })).then(posts => {
              setPosts(posts)
            })
          })
        } else {
            navigate('/')
        }
      }
  }, [signedIn, loading, navigate])

  return (
    <div className="MobileHome">
      <Helmet>
        <title>Home | Social Media App</title>
        <meta name="description" content="See all you friends posts and stories." />
      </Helmet>
      <MobileHeader user={user} />
      <MobileStoriesView />
      {
        (user && posts) ? <MobilePostsView posts={posts} user={user} /> : <p>Add Skeleton Posts Here</p>
      }
      <MobileNavigationBar />

    </div>
  );
}

export default MobileHome;
