import '../styles/MobileStoriesView.css'

import MobileStoryThumbnail from './MobileStoryThumbnail'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, getDoc, doc, addDoc, orderBy } from 'firebase/firestore'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { v4 } from 'uuid'

import { database, storage } from '../root/App'

function MobileStoriesView(props) {
  let { followers, user } = props

  const [stories, setStories] = useState([])

  useEffect(() => {
    followers.length !== 0 && getDocs(query(collection(database, 'stories'), where('user', 'in', followers), orderBy('time', 'desc'))).then(async stories => {
      Promise.all(stories.docs.map(async document => {
        let story = document.data()
        let user = await getDoc(doc(database, 'users', story.user))
        story.user = user.data()
        return { id: document.id, data: story }
      })).then(stories => {
        setStories(stories)
      })
    })
  }, [followers, setStories])

  const uploadStory = (imageUpload) => {
      if (imageUpload == null) return
      const uuid = v4()
      const imageRef = ref(storage, `stories/${uuid}`)
      uploadBytes(imageRef, imageUpload).then(() => {
          getDownloadURL(imageRef).then(downloadURL => {
            let story = {
              time: Date.now(),
              user: user.id,
              images: [downloadURL]
            }
            addDoc(collection(database, 'stories'), story).then((newStory) => { // Merge stories together
              setStories([{id: newStory.id, data: story}, ...stories])
            })
          })
      })
  }


  return (
    <div className="MobileStoriesView">
      <div className='MobileStoriesView__Upload'>
          <img className='MobileStoriesView__Upload__Icon' src={`../../assets/add-green.svg`} alt="" />
          <input className='MobileStoriesView__Upload__Button' type="file" onChange={(e) => {uploadStory(e.target.files[0])}} /> {/* Limit image size */}
      </div>
      {
        stories.map((story, idx) => {
          return <MobileStoryThumbnail key={idx} story={story} />
        })
      }
    </div>
  );
}

export default MobileStoriesView;