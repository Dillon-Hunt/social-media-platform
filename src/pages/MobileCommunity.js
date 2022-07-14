import MobileNavigationBar from '../components/MobileNavigationBar'
import MobileCommunityBanner from '../components/MobileCommunityBanner'
import MobileCommunityOverlay from '../components/MobileCommunityOverlay'

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'

import { database } from '../root/App'

function MobileCommunity(props) {
  const { signedIn } = props
  const { communityId } = useParams()

  const [community, setCommunity] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
      if (signedIn) {
          getDoc(doc(database, 'communities', communityId)).then(result => {
            setCommunity(result.data())
          })
      } else {
          navigate('/')
      }
  }, [signedIn, communityId, navigate])

  return (
    <div className="MobileCommunities">
        <Helmet>
          <title>{community === null ? 'Social Media App' : community.name}</title>
        </Helmet>
        <MobileCommunityBanner community={community} />
        <MobileCommunityOverlay community={community} />
        <MobileNavigationBar />

    </div>
  );
}

export default MobileCommunity;