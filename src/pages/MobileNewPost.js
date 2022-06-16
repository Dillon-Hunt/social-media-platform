import '../styles/MobileNewPost.css'

import MobileNavigationBar from '../components/MobileNavigationBar'

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore"

function MobileNewPost(props) {
    let { user, database } = props

    const navigate = useNavigate()

    const [caption, setCaption] = useState('')
    const [tags, setTags] = useState([])
    const [images, setImages] = useState([])


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

    return (
        <div className="MobileNewPost">

            <input className="MobileNewPost__Images" placeholder="Type Image Url(s)." maxLength={500} name="Post Images" onChange={(e) => setImages(e.target.value.replaceAll(' ', '').split(","))} />
            <textarea className="MobileNewPost__Caption" placeholder="Start Typing Here." maxLength={500} name="Post Caption" onChange={(e) => setCaption(e.target.value)} />
            <input className="MobileNewPost__Tags" placeholder="Separate tags with a comma." maxLength={100} name="Post Tags" onChange={(e) => setTags(e.target.value.replaceAll(' ', '').split(","))} />
            <button onClick={createPost} className="MobileNewPost__postButton">Post</button>

            <MobileNavigationBar />
        </div>
    );
}

export default MobileNewPost;
