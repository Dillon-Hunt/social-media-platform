import '../styles/MobileUserResult.css'

import { useState, useEffect } from 'react'
import { updateDoc, doc, arrayUnion, arrayRemove, increment } from 'firebase/firestore'

import { database } from '../root/App'

function MobileUserResult(props) {
    const { user, isFollowing, currentUser } = props

    const [following, setFollowing] = useState(false)

    useEffect(() => {
        setFollowing(isFollowing)
    }, [isFollowing])

    const followUser = () => {
        updateDoc(doc(database, 'followers', user.id), {"users": arrayUnion(currentUser.id)}).then(() => {
            updateDoc(doc(database, 'users', currentUser.id), {following: increment(1)}).then(() => {
                setFollowing(true) // Limited to one increment per second us distributed counter instead
            })
        })
    }

    const abandonUser = () => {
        updateDoc(doc(database, 'followers', user.id), {"users": arrayRemove(currentUser.id)}).then(() => {
            updateDoc(doc(database, 'users', currentUser.id), {following: increment(-1)}).then(() => {
                setFollowing(false)
            })
        })
    }

    return (
        <div className="MobileUserResult">
            <img className="MobileUserResult__Icon" src={user.data.profileIcon} alt='' />
            <div className="MobileUserResult__Content">
                <p className="MobileUserResult__Name">{user.data.name}</p>
                <p className="MobileUserResult__Username">{user.data.username}</p>
            </div>
            {
                following ? 
                <button className="MobileUserResult__Abandon" onClick={abandonUser}>Abandon</button>
                :
                <button className="MobileUserResult__Follow" onClick={followUser}>Follow</button>
                
            }
        </div>
    );
}

export default MobileUserResult;