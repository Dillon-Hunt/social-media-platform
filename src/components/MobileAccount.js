import '../styles/MobileAccount.css'

import { useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'

import { storage } from '../root/App'
 
function MobileAccount(props) {
    let { user } = props

    const [profileIcon, setProfileIcon] = useState(null)

    const profileIconRef = ref(storage, `users/${user.data.profileIcon}`)

    getDownloadURL(profileIconRef).then(downloadURL => {
      setProfileIcon(downloadURL)
    })

    return (
      <div className="MobileAccount">
        {
          user.length !== 0 ? <>
            <img className="MobileAccount__ProfileIcon" src={profileIcon} alt={user.username} />
            <p className="MobileAccount__Name">{user.data.name}</p>
            <p className="MobileAccount__Username">{user.data.username}</p>
          </> : <>
            <div className="MobileAccount__ProfileIcon" style={{marginLeft: '1px'}} />
            <div className='MobileAccount__Placeholder__Name' />
            <div className='MobileAccount__Placeholder__Username' />
          </>
        }
      </div>
    );
  }
  
  export default MobileAccount;