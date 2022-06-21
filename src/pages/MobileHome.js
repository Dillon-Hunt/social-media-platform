import '../styles/MobileHome.css'

import MobileHeader from '../components/MobileHeader'
import MobileStoriesView from '../components/MobileStoriesView'
import MobilePostsView from '../components/MobilePostsView'
import MobilePostSkeleton from "../components/MobilePostSkeleton";

import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc, query, orderBy, limit, where } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'

import { auth, database } from '../root/App'

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
          getDocs(query(collection(database, 'followers'), where('users', 'array-contains', signedIn.uid))).then(async followers => {
            let users = await Promise.all(followers.docs.map(doc => doc.id))
            if (users.length === 0) {
              setPosts("No Posts")
            } else {
              getDocs(query(collection(database, 'posts'), orderBy("time", "desc"), where('user', 'in', users), limit(20))).then(async postData => {
                await Promise.all(postData.docs.map(async document => {
                  let docData = document.data()
                  let user = await getDoc(doc(database, 'users', docData.user))
                  docData.user = user.data()
                  return { id: document.id, data: docData }
                })).then(posts => {
                  setPosts(posts)
                })
              })
            }
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
        (user && posts) ? posts === "No Posts" ? <p>Looks Like You Aren't Following Anybody Yet</p> : posts.length === 0 ? <p>No Posts Yet</p> : <MobilePostsView posts={posts} user={user} /> : <MobilePostSkeleton />
      }
      <MobileNavigationBar />

    </div>
  );
}

export default MobileHome;
