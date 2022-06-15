import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"

import '../styles/MobilePost.css'

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
  let { post, user, database } = props

  let [postUser, setPostUsers] = useState([])

  useEffect(() => {
    let mounted = true
    getDoc(doc(database, 'users', post.user)).then(doc => {
      mounted && setPostUsers(doc.data())
      return () => mounted = false
    })
  }, [])

  return (
    <div className="MobilePost">
      <div className="MobilePost__ProfileSection">
        <img className="MobilePost__ProfileIcon" src={postUser.profileIcon} alt="" />
        <p className="MobilePost__Username">{postUser.name}</p>
        <p className="MobilePost__Time">{getTimeString(Math.floor((Date.now() - new Date(post.time))))}</p>
      </div>

      <div className="MobilePost__ImageSection">
        <img className="MobilePost__Image" src={post.images[0]} alt="" /> {/* Add Slideshow In Future */}
        <div className="MobilePost__Overlay">
          <div className="icon25"> {/* post.id does not exist at the moment, will need a way to get the document id */}
            <img className="MobilePost__Overlay__Icon" src={`../../placeholders/favorite${user.favorites.includes(post.id) ? "-filled" : ""}.svg`} alt="favorite" />
            <p className="MobilePost__Overlay__Likes">{getValueString(post.favorites.length)}</p>
          </div>


          <div className="icon25">
            <img className="MobilePost__Overlay__Icon" src="../../placeholders/comment.svg" alt="comment" />
            <p className="MobilePost__Overlay__Comments">{getValueString(post.comments.length)}</p>
          </div>

          <div className="icon25 MobilePost__Overlay__More">
            <img className="MobilePost__Overlay__Icon" src="../../placeholders/more.svg" alt="more" />
          </div>
        </div>
      </div>


      <div className="MobilePost__CaptionSection">
        <p className="MobilePost__Content">{post.content.text}</p>
        <div className="MobilePost__Tags">
          {/* These will be <a></a> tags at some point */}
          
          {
            post.tags.map((tag, idx) => {
              return <p key={idx}>#{tag}</p>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MobilePost;