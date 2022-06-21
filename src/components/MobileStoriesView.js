import '../styles/MobileStoriesView.css'

import MobileStoryThumbnail from './MobileStoryThumbnail'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore'
import { database } from '../root/App'

function MobileStoriesView(props) {
  let { followers } = props

  const [stories, setStories] = useState([])

  useEffect(() => {
    followers.length !== 0 && getDocs(query(collection(database, 'stories'), where('user', 'in', followers))).then(async stories => {
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


  return (
    <div className="MobileStoriesView">
      {
        stories.map((story, idx) => {
          return <MobileStoryThumbnail key={idx} story={story} />
        })
      }
    </div>
  );
}

export default MobileStoriesView;