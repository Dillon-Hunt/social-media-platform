import '../styles/MobileNewPost.css'

import MobileNavigationBar from '../components/MobileNavigationBar'

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { doc, writeBatch, arrayUnion } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { Helmet } from 'react-helmet-async'

import { storage, database } from '../root/App'


function MobileNewPost(props) {
    const { signedIn } = props

    const [caption, setCaption] = useState('')
    const [tags, setTags] = useState([])
    const [images, setImages] = useState([])

    const [loadingImages, setLoadingImages] = useState(0)
  
    const navigate = useNavigate()
  
    useEffect(() => {
      if (!signedIn) {
          navigate('/')
      }
    }, [signedIn, navigate])

    const createPost = () => {
        let post = {
            time: Date.now(),
            tags: tags,
            user: signedIn.id,
            images: images,
            text: caption,
            comments: [],
        }
        const uuid = v4()
        const batch = writeBatch(database)
        batch.set(doc(database, `users/${signedIn.uid}/posts/${uuid}`), post)
        batch.update(doc(database, 'users', signedIn.uid), {"recentPosts": arrayUnion(post)})
        batch.set(doc(database, "favorites", uuid), {users: []})
        batch.commit().then(() => {
            /* logEvent(analytics, 'create_post', {
                tags: tags,
            }) */
            navigate("/")
        })
    }

    const uploadImagePost = (imageUpload) => {
        if (imageUpload == null) return
        let newLoadingImages = loadingImages + 1
        setLoadingImages(newLoadingImages)
        const uuid = v4()
        const imageRef = ref(storage, `posts/${uuid}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then(downloadURL => {
                setImages([...images, downloadURL])
                setLoadingImages(newLoadingImages - 1)
            })
        })
    }

    return (
        <div className="MobileNewPost">
            <Helmet>
            <title>Create Post</title>
            <meta name="description" content="Create a new post on you account." />
            </Helmet>
            <div className='MobileNewPost__Images'>
                <div className='MobileNewPost__Upload'>
                    <img className='MobileNewPost__Upload__Icon' src={`../../assets/add-green.svg`} alt="" />
                    <input className='MobileNewPost__Upload__Button' type="file" onChange={(e) => {uploadImagePost(e.target.files[0])}} accept="image/png, image/gif, image/jpeg" /> {/* Limit image size */}
                </div>
                {
                images.map((image, idx) => {
                    return <img className='MobileNewPost__Image' key={idx} src={image} alt='' />
                })
            }

            </div>

            <textarea className="MobileNewPost__Caption" placeholder="Start Typing Here." maxLength={500} name="Post Caption" onChange={(e) => setCaption(e.target.value)} />
           
            <input className="MobileNewPost__Tags" placeholder="Separate tags with a comma." maxLength={100} name="Post Tags" onChange={(e) => setTags(e.target.value.replaceAll(' ', '').split(","))} />
           
            <button onClick={createPost} className="MobileNewPost__PostButton" disabled={!(loadingImages <= 0)}>{loadingImages <= 0 ? 'Post' : 'Loading Images'}</button>

            <MobileNavigationBar />
        </div>
    );
}

export default MobileNewPost;
