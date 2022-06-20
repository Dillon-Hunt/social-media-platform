import '../styles/MobilePost.css'

import { useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'

import { storage } from '../root/App'

// Helper Functions
function getTimeString(milliseconds) {
  let time = Math.floor(milliseconds / 31536000000) 
  let type = time === 1 ? ' year ago' : ' years ago'
  time === 0 && (time = Math.floor(milliseconds / 86400000)) && (type = time === 1 ? ' day ago' : ' days ago')
  time === 0 && (time = Math.floor(milliseconds / 3600000)) && (type = time === 1 ? ' hour ago' : ' hours ago')
  time === 0 && (time = Math.floor(milliseconds / 60000)) && (type = time === 1 ? ' minute ago' : ' minutes ago')
  time === 0 && (type = 'just now') && (time = '')
  return time + type
}

function getValueString(count) {
  if (count === 0) return <strong>0</strong>

  let value = Math.floor(count / 1000000)
  let symbol = 'M'
  value === 0 && (value = Math.floor(count / 1000)) && (symbol = 'K')
  value === 0 && (value = count) && (symbol = '')
  return <><strong>{value}</strong>{symbol}</>
}

function MobilePost(props) {
  let { post, user } = props

  const [profileIcon, setProfileIcon] = useState(null)

  const profileIconRef = ref(storage, `users/${post.data.user.profileIcon}`)

  getDownloadURL(profileIconRef).then(downloadURL => {
    setProfileIcon(downloadURL)
  })

  return (
    <div className="MobilePost">
      <div className="MobilePost__ProfileSection">
        <div className='MobilePost__ImageContainer'>
          <img className="MobilePost__ProfileIcon" src={profileIcon} alt='' />
        </div>
        <p className="MobilePost__Username">{post.data.user.name}</p>
        <p className="MobilePost__Time">{getTimeString(Math.floor((Date.now() - new Date(post.data.time))))}</p>
      </div>

      <div className="MobilePost__ImageSection">
        <img className="MobilePost__Image" src={post.data.images[0]} alt="" /> {/* Add Slideshow In Future */}
        <div className="MobilePost__Overlay">
          <div className="icon25"> {/* post.id does not exist at the moment, will need a way to get the document id */}
            <img className="MobilePost__Overlay__Icon" src={`../../assets/favorite${user.data.favorites.includes(post.id) ? "-filled" : ""}.svg`} alt="favorite" />
            <p className="MobilePost__Overlay__Likes">{getValueString(post.data.favorites.length)}</p>
          </div>


          <div className="icon25">
            <img className="MobilePost__Overlay__Icon" src="../../assets/comment.svg" alt="comment" />
            <p className="MobilePost__Overlay__Comments">{getValueString(post.data.comments.length)}</p>
          </div>

          <div className="icon25 MobilePost__Overlay__More">
            <img className="MobilePost__Overlay__Icon" src="../../assets/more.svg" alt="more" />
          </div>
        </div>
      </div>


      <div className="MobilePost__CaptionSection">
        <p className="MobilePost__Content">{post.data.text}</p>
        <div className="MobilePost__Tags">
          {/* These will be <a></a> tags at some point */}
          
          {
            post.data.tags.map((tag, idx) => {
              return <p key={idx}>#{tag}</p>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MobilePost;