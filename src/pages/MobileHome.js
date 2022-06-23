import '../styles/MobileHome.css'

import MobileHeader from '../components/MobileHeader'
import MobileStoriesView from '../components/MobileStoriesView'
import MobilePostsView from '../components/MobilePostsView'
import MobilePostSkeleton from "../components/MobilePostSkeleton";

import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc, query, where, documentId } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'

import { auth, database } from '../root/App'

function MobileHome() {
  let [posts, setPosts] = useState(null)
  const [signedIn, loading] = useAuthState(auth)
  let [user, setSetUser] = useState([])
  let [followers, setFollowers] = useState([])

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
            let followerIds = await Promise.all(followers.docs.map(doc => doc.id))
            setFollowers(followerIds)
            if (followerIds.length === 0) {
              setPosts("No Posts")
            } else {
              let followersData = await getDocs(query(collection(database, 'users'), where(documentId(),'in', followerIds)))
              followersData = followersData.docs.map(doc => doc.data())
              let recentPostsUnmerged = []
              for (let i = 0; i < followersData.length; i++) {
                followersData[i].recentPosts.forEach(post => {
                  post.user = {
                    name: followersData[i].name,
                    username: followersData[i].username,
                    profileIcon: followersData[i].profileIcon
                  }
                  recentPostsUnmerged.push(post)
                });
              }
              let recentPosts = [].concat(recentPostsUnmerged).sort((a, b) => {return a.time - b.time})
              setPosts(recentPosts)
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
      <MobileStoriesView followers={followers} user={user} />
      {
        (user && posts) ? posts === "No Posts" ? <p className='MobileHome__Message'>Looks Like You Aren't Following Anybody Yet</p> : posts.length === 0 ? <p className='MobileHome__Message'>No Posts Yet</p> : <MobilePostsView posts={posts} user={user} /> : <MobilePostSkeleton />
      }
      <MobileNavigationBar />

    </div>
  );
}

export default MobileHome;
