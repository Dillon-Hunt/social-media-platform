import '../styles/MobileFriends.css'

import MobileNavigationBar from '../components/MobileNavigationBar'
import MobileFriend from '../components/MobileFriend'

import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from "react-router-dom"


import { database } from '../root/App'
import { getDocs, query, collection, where, doc, getDoc } from 'firebase/firestore'

function MobileFriends(props) {
  const { signedIn } = props

  const [friends, setFriends] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (signedIn) {
      getDocs(query(collection(database, 'followers'), where('users', 'array-contains', signedIn.uid))).then(async followers => {
        let followerIds = await Promise.all(followers.docs.map(doc => doc.id))
        let friends = []
        await followerIds.forEach(async id => {
          if (id !== signedIn.uid) {
            const friendData = await getDoc(doc(database, 'users', id))
            let friend = friendData.data()
            friend.id = friendData.id
            setFriends([...friends, friend])
            friends.push(friend)
          }
        })
      })
    } else {
      navigate('/')
    }
  }, [signedIn, navigate])

  return (
    <div className="MobileFriends">
        <Helmet>
          <title>Messages</title>
        </Helmet>
        <h2 className="MobileFriends__Title">Following</h2>
        {
          friends.length !== 0 && 
            friends.map((friend, idx) => {
              return <MobileFriend key={idx} user={friend} currentUser={signedIn.uid} />
            })
        }
        <MobileNavigationBar />
    </div>
  );
}

export default MobileFriends;