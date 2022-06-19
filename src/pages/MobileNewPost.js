import '../styles/MobileNewPost.css'

import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useState, useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

import { storage, database, auth } from '../root/App'


function MobileNewPost() {

    const [caption, setCaption] = useState('')
    const [tags, setTags] = useState([])
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [imageUpload, setImageUpload] = useState(null)
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
            if (!signedIn) {
                navigate('/')
            }
        }
    }, [signedIn, loading, navigate])


    const createPost = () => {
        let post = {
            time: Date.now(),
            tags: tags,
            user: user.id,
            images: images,
            text: caption,
            favorites: [],
            comments: [],
        }
        
        addDoc(collection(database, "posts"), post).then(() => navigate("/"))
    }

    const uploadImagePost = () => {
        if (imageUpload == null) return
        const uuid = v4()
        const imageRef = ref(storage, `posts/${uuid}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            setImages([...images, uuid])
            getDownloadURL(imageRef).then(downloadURL => {
                setImagePreviews([...imagePreviews, downloadURL])
            })
        })
    }

    return (
        <div className="MobileNewPost">
            <input type="file" onChange={(e) => {setImageUpload(e.target.files[0])}} /> {/* Limit to one image per upload */}
            <button onClick={uploadImagePost}>Upload Image</button>
            {
                imagePreviews.map((image, idx) => {
                    return <img key={idx} src={image} alt='' />
                })
            }

            {/* <input className="MobileNewPost__Images" placeholder="Type Image Url(s)." maxLength={500} name="Post Images" onChange={(e) => setImages(e.target.value.replaceAll(' ', '').split(","))} /> */}
            <textarea className="MobileNewPost__Caption" placeholder="Start Typing Here." maxLength={500} name="Post Caption" onChange={(e) => setCaption(e.target.value)} />
            <input className="MobileNewPost__Tags" placeholder="Separate tags with a comma." maxLength={100} name="Post Tags" onChange={(e) => setTags(e.target.value.replaceAll(' ', '').split(","))} />
            <button onClick={createPost} className="MobileNewPost__postButton">Post</button>

            <MobileNavigationBar />
        </div>
    );
}

export default MobileNewPost;
