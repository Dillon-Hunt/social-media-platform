import '../styles/MobilePost.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDoc, arrayUnion, doc, arrayRemove, updateDoc } from 'firebase/firestore'

import { database } from '../root/App'

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

  const [favorite, setFavorite] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState(0)


  useEffect(() => {
    let bind = true
    bind && getDoc(doc(database, 'favorites', post.id)).then(async document => {
      if (!document.exists()) return () => bind = false
      let favorites = await document.data()
      setFavorite(favorites.users.includes(user.id))
      setFavoriteCount(favorites.users.length)
      return () => bind = false
    })
  }, [post, user])

  const favoritePost = () => {
    !favorite ? updateDoc(doc(database, 'favorites', post.id), {"users": arrayUnion(user.id)}).then(() => {
      setFavoriteCount(favoriteCount + 1)
      setFavorite(true)
    }) : updateDoc(doc(database, 'favorites', post.id), {"users": arrayRemove(user.id)}).then(() => {
      setFavoriteCount(favoriteCount - 1)
      setFavorite(false)
    })
  }

  return (
    <div className="MobilePost">
      <div className="MobilePost__ProfileSection">
        <Link to={`/users/${post.data.user.username.toLowerCase()}`} className='MobilePost__ImageContainer'>
          <img className="MobilePost__ProfileIcon" src={post.data.user.profileIcon} alt='' />
        </Link>
        <Link to={`/users/${post.data.user.username.toLowerCase()}`}><p className="MobilePost__Username">{post.data.user.name}</p></Link>
        <p className="MobilePost__Time">{getTimeString(Math.floor((Date.now() - new Date(post.data.time))))}</p>
      </div>

      <div className="MobilePost__ImageSection">
        <img className="MobilePost__Image" src={post.data.images[0]} alt="" /> {/* Add Slideshow In Future */}
        <div className="MobilePost__Overlay">
          <div className="icon25"> {/* post.id does not exist at the moment, will need a way to get the document id */}
            <img className="MobilePost__Overlay__Icon" src={`../../assets/favorite${favorite ? "-filled" : ""}.svg`} alt="favorite" />
            <p className="MobilePost__Overlay__Likes">{getValueString(favoriteCount)}</p>
            <button onClick={favoritePost} className="MobilePost__Overlay__Likes__Button" />
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