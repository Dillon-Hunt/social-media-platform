import MobileProfileBanner from '../components/MobileProfileBanner'
import MobileProfileOverlay from '../components/MobileProfileOverlay'
import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, doc, where, getDocs, query, collection } from 'firebase/firestore'
import { Helmet } from 'react-helmet-async'

import { auth, database } from '../root/App'


function MobileUserProfile() {
    let { username } = useParams()

    const [signedIn, loading] = useAuthState(auth)
    
    let [user, setSetUser] = useState(null)
    let [posts, setPosts] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && signedIn) {
            getDoc(doc(database, 'usernames', username)).then(usernameDoc => {
                let id = usernameDoc.data().id

                getDoc(doc(database, 'users', id)).then(async document => {
                    let users = document.data()
                    users.followers = await (await getDoc(doc(database, 'followers', id))).data().users.length
                    setSetUser({ id: document.id, data: users })
                    if (!document.exists()) {
                    navigate('/setup')
                    }
                })

                getDocs(query(collection(database, 'posts'), where('user', '==', id))).then(async postData => {
                    await await Promise.all(postData.docs.map(async document => {
                    let docData = document.data()
                    return { id: document.id, data: docData }
                    })).then(posts => {
                    setPosts(posts)
                    })
                })

            })
        }
    }, [signedIn, loading, navigate, username])

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
            <title>{user === null ? 'Social Media App' : `${user.data.username} | Social Media App`}</title>
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

export default MobileUserProfile;