import '../styles/MobileProfileOverlay.css'

import MobileAccount from './MobileAccount'
import MobileProfileStats from './MobileProfileStats'
import MobileAccountContent from '../components/MobileAccountContent'

import { collection, getDocs, getDoc, doc, query, orderBy, where } from "firebase/firestore"
import React, { useState, useEffect } from "react"

import { database } from '../root/App';

function MobileProfileOverlay(props) {
  const { user } = props

  let [posts, setPosts] = useState([])
  
  useEffect(() => {
    let mounted = true
    mounted && user.length !== 0 && getDocs(query(collection(database, 'posts'), where("user", "==", user.id), orderBy("time", "desc"))).then(async postData => {
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
  }, [user])

  return (
    <div className="MobileProfileOverlay">
      <MobileAccount user={user} />
      <MobileProfileStats user={user} posts={posts.length} />
      <MobileAccountContent posts={posts} />
    </div>
  );
}

export default MobileProfileOverlay;