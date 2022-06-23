import '../styles/MobileStoriesView.css'

import MobileStoryThumbnail from './MobileStoryThumbnail'

import { collection, addDoc } from 'firebase/firestore'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { v4 } from 'uuid'

import { database, storage } from '../root/App'
import { useEffect, useState } from 'react'

function MobileStoriesView(props) {
  let { user } = props

  const [stories, setStories] = useState([])
  const [isDisabled, setDisabled] = useState(false)

  useEffect(() => {
    setStories(props.stories)
  }, [setStories, props])

  const uploadStory = (imageUpload) => {
    if (imageUpload == null) return
    const uuid = v4()
    const imageRef = ref(storage, `stories/${uuid}`)
    setDisabled(true)
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then(downloadURL => {
        let story = {
          time: Date.now(),
          image: downloadURL
        }
        addDoc(collection(database, `users/${user.id}/stories`), story).then((newStory) => {
          let changed = false
          let newStories = [...stories]
          for (let i = 0; i < newStories.length; i++) {
            if (newStories[i].username === user.data.username) {
              newStories[i].stories = [story, ...newStories[i].stories]
            }
            changed = true
          }
          !changed && newStories.push({
            name: user.data.name,
            username: user.data.username,
            stories: [story]
          })
          setStories(newStories)
          setDisabled(false)
        })
      })
    })
  }


  return (
    <div className="MobileStoriesView">
      <div className='MobileStoriesView__Upload' loadingimage={isDisabled.toString()}>
          <img className='MobileStoriesView__Upload__Icon' src={`../../assets/add-green.svg`} alt="" />
          <input className='MobileStoriesView__Upload__Button' type="file" onChange={(e) => {uploadStory(e.target.files[0])}} disabled={isDisabled} /> {/* Limit image size */}
          <p className='MobileStoryThumbnail__Username'>Add To Story</p>
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