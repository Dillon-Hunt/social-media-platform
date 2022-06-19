import '../styles/MobileProfileBanner.css'

import { useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'

import { storage } from '../root/App'

function MobileProfileBanner(props) {
  let { user } = props

  const [profileBanner, setProfileBanner] = useState(null)

  const profileBannerRef = ref(storage, `users/${user.data.profileBanner}`)

  getDownloadURL(profileBannerRef).then(downloadURL => {
    setProfileBanner(downloadURL)
  })

  return (
    user.length !== 0 ? <img className="MobileProfileBanner" src={profileBanner} alt='' />
    : <div className="MobileProfileBanner" />
  )
}

export default MobileProfileBanner;