import '../styles/MobileNewPost.css'

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { setDoc, getDoc, doc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

import { storage, database, auth } from '../root/App'


function MobileAccountSetup() {

    const navigate = useNavigate()

    const [profileIcon, setProfileIcon] = useState(null)
    const [profileBanner, setProfileBanner] = useState(null)

    const [profileIconPreview, setProfileIconPreview] = useState(null)
    const [profileBannerPreview, setProfileBannerPreview] = useState(null)

    const [profileIconUpload, setProfileIconUpload] = useState(null)
    const [profileBannerUpload, setProfileBannerUpload] = useState(null)

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [signedIn, loading] = useAuthState(auth)

    const [showAccountSetup, setShowAccountSetup] = useState(false)

    useEffect(() => {
        if (!loading) {
            if (signedIn) {
                getDoc(doc(database, 'users', signedIn.uid)).then(document => {
                    if (document.exists()) {
                        navigate('/home')
                    } else {
                        setShowAccountSetup(true)
                    }
                })
            } else {
                navigate('/')
            }
        }
    }, [signedIn, loading, showAccountSetup, navigate])


    const createUser = () => {
        let user = {
            profileIcon: profileIcon || 'DefaultProfileIcon',
            profileBanner: profileBanner || 'DefaultProfileBanner',
            name: name || 'DefaultProfileBanner',
            username: username,
            bio: "",
            favorites: [],
            followers: [],
            following: [],
            posts: [],
        }
        
        if (username && name) {
            setDoc(doc(database, "users", signedIn.uid), user).then(() => navigate("/home"))
        } else {
            console.log("Please Enter A Valid Name & Username") // Display this somewhere
        } 
    }

    const uploadProfileIcon = () => {
        if (profileIconUpload == null) return
        const uuid = v4()
        const imageRef = ref(storage, `users/${uuid}`)
        uploadBytes(imageRef, profileIconUpload).then(() => {
            setProfileIcon(uuid)
            getDownloadURL(imageRef).then(downloadURL => {
                setProfileIconPreview(downloadURL)
            })
        })
    }

    const uploadProfileBanner = () => {
        if (profileBannerUpload == null) return
        const uuid = v4()
        const imageRef = ref(storage, `users/${uuid}`)
        uploadBytes(imageRef, profileBannerUpload).then(() => {
            setProfileBanner(uuid)
            getDownloadURL(imageRef).then(downloadURL => {
                setProfileBannerPreview(downloadURL)
            })
        })
    }

    return (
        <div className="MobileAccountSetup">
            {
                showAccountSetup && 
                <>
                    <input type="file" onChange={(e) => {setProfileIconUpload(e.target.files[0])}} />
                    <button onClick={uploadProfileIcon}>Upload Profile Image</button>
                    <img src={profileIconPreview} alt='' />

                    <input type="file" onChange={(e) => {setProfileBannerUpload(e.target.files[0])}} />
                    <button onClick={uploadProfileBanner}>Upload Profile Banner</button>
                    <img src={profileBannerPreview} alt='' />

                    <input type="text" onChange={(e) => {setName(e.target.value)}} placeholder='Display Name' />

                    <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder='Username' />

                    <button onClick={createUser}>Next</button>
                </>
            }
        </div>
    );
}

export default MobileAccountSetup;
