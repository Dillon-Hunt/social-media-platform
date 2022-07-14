import MobileProfileBanner from '../components/MobileProfileBanner'
import MobileProfileOverlay from '../components/MobileProfileOverlay'
import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, doc, getDocs, query, collection, orderBy } from 'firebase/firestore'
import { Helmet } from 'react-helmet-async'

import { database } from '../root/App'


function MobileUserProfile(props) {
    const { signedIn } = props
    let { username } = useParams()
    
    let [user, setSetUser] = useState(null)
    let [posts, setPosts] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (signedIn) {
            getDoc(doc(database, 'usernames', username)).then(usernameDoc => {
                if (!usernameDoc.exists()) {
                    navigate('/404')
                } else {
                    let id = usernameDoc.data().id

                    getDoc(doc(database, 'users', id)).then(async document => {
                        let users = document.data()
                        users.followers = await (await getDoc(doc(database, 'followers', id))).data().users.length
                        setSetUser({ id: document.id, data: users })
                    })

                    getDocs(query(collection(database, `users/${id}/posts`), orderBy('time', 'desc'))).then(async postData => {
                        await await Promise.all(postData.docs.map(async document => {
                        let docData = document.data()
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
    }, [signedIn, navigate, username])

    return (
        <div className="MobileProfile">
        <Helmet>
            <title>{user === null ? 'Social Media App' : user.data.username}</title>
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