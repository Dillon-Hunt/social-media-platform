import '../styles/MobileAccountSetup.css'

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { setDoc, getDoc, doc } from "firebase/firestore"
import { logEvent} from "firebase/analytics"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { Helmet } from 'react-helmet-async'

import { storage, database, auth, analytics } from '../root/App'


function MobileAccountSetup() {

    const navigate = useNavigate()

    const [profileIcon, setProfileIcon] = useState(null)
    const [profileBanner, setProfileBanner] = useState(null)

    const [profileIconPreview, setProfileIconPreview] = useState('../../assets/DefaultProfileIcon.png')
    const [profileBannerPreview, setProfileBannerPreview] = useState('../../assets/DefaultProfileBanner.jpg')

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
            followers: [],
            following: [],
            posts: [],
        }
        
        if (username && name) {
            setDoc(doc(database, "users", signedIn.uid), user).then(() => {
                logEvent(analytics, 'create_account')
                navigate("/home")
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
            setProfileIcon(uuid)
            getDownloadURL(imageRef).then(downloadURL => {
                setProfileIconPreview(downloadURL)
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
            setProfileBanner(uuid)
            getDownloadURL(imageRef).then(downloadURL => {
                setProfileBannerPreview(downloadURL)
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
                        <img className='MobileAccountSetup__Upload__Image' src={profileIconPreview} alt='' />
                        <p className='MobileAccountSetup__Upload__Text'>Edit</p>
                        <input className='MobileAccountSetup__Upload__Button' type="file" onChange={(e) => {uploadProfileIcon(e.target.files[0])}} /> {/* Limit image size */}
                    </div>

                     <div className='MobileAccountSetup__Upload__Banner'>
                        <img className='MobileAccountSetup__Upload__Image' src={profileBannerPreview} alt='' />
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
