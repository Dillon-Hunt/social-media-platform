import '../styles/MobileHome.css'

import MobileHeader from '../components/MobileHeader'
import MobileStoriesView from '../components/MobileStoriesView'
import MobilePostsView from '../components/MobilePostsView'
import MobilePostSkeleton from "../components/MobilePostSkeleton";

import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useState, useEffect } from "react"
import { collection, getDocs, getDoc, doc, query, where, documentId, orderBy } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'

import { auth, database } from '../root/App'

function MobileHome() {
  let [posts, setPosts] = useState(null)
  let [stories, setStories] = useState([])
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
            let followerIds = await Promise.all(followers.docs.map(doc => doc.id))
            if (followerIds.length === 0) {
              setPosts("No Posts")
            } else {
              let followersData = await getDocs(query(collection(database, 'users'), where(documentId(),'in', followerIds)))
              followersData = followersData.docs.map(doc => {
                followersData = doc.data()
                followersData.id = doc.id
                return followersData
              })
              let recentPostsUnmerged = []
              let stories = []
              followersData.forEach(follower => {
                follower.recentPosts.forEach(post => {
                  post.user = {
                    name: follower.name,
                    username: follower.username,
                    profileIcon: follower.profileIcon
                  }
                  recentPostsUnmerged.push(post)
                });
                getDocs(query(collection(database, `users/${follower.id}/stories`), orderBy('time', 'desc'))).then(userStories => {
                  userStories = userStories.docs.map(doc => doc.data())
                  if (userStories.length !== 0) {
                    stories.push({
                      name: follower.name,
                      username: follower.username,
                      stories: userStories,
                    })
                  }
                  setStories(stories)
                })
              })
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
        <title>Home</title>
        <meta name="description" content="See all you friends posts and stories." />
      </Helmet>
      <MobileHeader user={user} />
      <MobileStoriesView stories={stories} user={user} />
      {
        (user && posts) ? posts === "No Posts" ? <p className='MobileHome__Message'>Looks Like You Aren't Following Anybody Yet</p> : posts.length === 0 ? <p className='MobileHome__Message'>No Posts Yet</p> : <MobilePostsView posts={posts} user={user} /> : <MobilePostSkeleton />
      }
      <MobileNavigationBar />

    </div>
  );
}

export default MobileHome;
