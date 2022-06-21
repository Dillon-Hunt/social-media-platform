import '../styles/MobileAccountSetup.css'

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, doc, writeBatch } from "firebase/firestore"
import { logEvent} from "firebase/analytics"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { Helmet } from 'react-helmet-async'

import { storage, database, auth, analytics } from '../root/App'


function MobileAccountSetup() {

    const navigate = useNavigate()

    const [profileIcon, setProfileIcon] = useState('../../assets/DefaultProfileIcon.png')
    const [profileBanner, setProfileBanner] = useState('../../assets/DefaultProfileBanner.png')

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [useRequired, setUseRequired] = useState(false)
    const [signedIn, loading] = useAuthState(auth)

    const [showAccountSetup, setShowAccountSetup] = useState(false)


    const [loadingImages, setLoadingImages] = useState(0)

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
            profileIcon: profileIcon || 'DefaultProfileIcon.png',
            profileBanner: profileBanner || 'DefaultProfileBanner.png',
            name: name,
            username: username,
            bio: "",
            favorites: [],
            posts: [],
            following: 0,
        }
        
        if (username && name) {
            getDoc(doc(database, 'usernames', username.toLowerCase())).then(async username => {
                let taken = username.exists()
                if (!taken) {
                    const batch = writeBatch(database)
                    batch.set(doc(database, "followers", signedIn.uid), {users: []})
                    batch.set(doc(database, "usernames", user.username.toLowerCase()), {})
                    batch.set(doc(database, "users", signedIn.uid), user)

                    await batch.commit().then(() => {
                        logEvent(analytics, 'create_account')
                        navigate("/home")
                    })
                } else {
                    alert("This Username Is Already Taken")
                }
            })
        } else {
            setUseRequired(true)
        } 
    }

    const uploadProfileIcon = (profileIconUpload) => {
        if (profileIconUpload == null) return
        let newLoadingImages = loadingImages + 1
        setLoadingImages(newLoadingImages)
        const uuid = v4()
        const imageRef = ref(storage, `users/${uuid}`)
        uploadBytes(imageRef, profileIconUpload).then(() => {
            getDownloadURL(imageRef).then(downloadURL => {
                setProfileIcon(downloadURL)
                setLoadingImages(newLoadingImages - 1)
            })
        })
    }

    const uploadProfileBanner = (profileBannerUpload) => {
        if (profileBannerUpload == null) return
        let newLoadingImages = loadingImages + 1
        setLoadingImages(newLoadingImages)
        const uuid = v4()
        const imageRef = ref(storage, `users/${uuid}`)
        uploadBytes(imageRef, profileBannerUpload).then(() => {
            getDownloadURL(imageRef).then(downloadURL => {
                setProfileBanner(downloadURL)
                setLoadingImages(newLoadingImages - 1)
            })
        })
    }

    return (
        <div className="MobileAccountSetup">
            <Helmet>
                <title>Setup Your Account | Social Media App</title>
            </Helmet>
            {
                showAccountSetup && 
                <>
                    <div className='MobileAccountSetup__Upload'>
                        <img className='MobileAccountSetup__Upload__Image' src={profileIcon} alt='' />
                        <p className='MobileAccountSetup__Upload__Text'>Edit</p>
                        <input className='MobileAccountSetup__Upload__Button' type="file" onChange={(e) => {uploadProfileIcon(e.target.files[0])}} /> {/* Limit image size */}
                    </div>

                     <div className='MobileAccountSetup__Upload__Banner'>
                        <img className='MobileAccountSetup__Upload__Image' src={profileBanner} alt='' />
                        <p className='MobileAccountSetup__Upload__Text'>Edit Banner</p>
                        <input className='MobileAccountSetup__Upload__Button' type="file" onChange={(e) => {uploadProfileBanner(e.target.files[0])}} /> {/* Limit image size */}
                    </div>

                    <input className='MobileAccountSetup__Text' type="text" onChange={(e) => {setName(e.target.value)}} placeholder='Display Name' required={useRequired} />

                    <input className='MobileAccountSetup__Text' type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder='Username' required={useRequired} />

                    <button className='MobileAccountSetup__NextButton' onClick={createUser} disabled={!(loadingImages <= 0)}>{loadingImages <= 0 ? 'Create Account' : 'Loading Images'}</button>
                </>
            }
        </div>
    );
}

export default MobileAccountSetup;
