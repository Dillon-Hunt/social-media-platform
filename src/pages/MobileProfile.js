import MobileProfileBanner from '../components/MobileProfileBanner'
import MobileProfileOverlay from '../components/MobileProfileOverlay'
import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { getDoc, doc, getDocs, query, collection, orderBy } from 'firebase/firestore'
import { Helmet } from 'react-helmet-async'

import { database } from '../root/App'


function MobileProfile(props) {
  const { signedIn } = props
  
  let [user, setSetUser] = useState(null)
  let [posts, setPosts] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (signedIn) {
      getDoc(doc(database, 'users', signedIn.uid)).then(async document => {
        let users = document.data()
        users.followers = await (await getDoc(doc(database, 'followers', signedIn.uid))).data().users.length
        setSetUser({ id: document.id, data: users })
        if (!document.exists()) {
          navigate('/setup')
        }
      })
      getDocs(query(collection(database, `users/${signedIn.uid}/posts`), orderBy('time', 'desc'))).then(async postData => {
        await await Promise.all(postData.docs.map(async document => {
          let docData = document.data()
          return { id: document.id, data: docData }
        })).then(posts => {
          setPosts(posts)
        })
      })
    } else {
      navigate('/')
    }
  }, [signedIn, navigate])

  return (
    <div className="MobileProfile">
      <Helmet>
        <title>{user === null ? 'Social Media App' : `${user.data.username} | Social Media App`}</title>
      </Helmet>
      <MobileProfileBanner user={user} />
      <MobileProfileOverlay user={user} posts={posts} />
      <MobileNavigationBar />
    </div>
  );
}

export default MobileProfile;