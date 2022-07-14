import '../styles/MobileCommunityOverlay.css'

import MobileCommunityStats from './MobileCommunityStats'

function MobileCommunityOverlay(props) {
  const { community } = props

  return (
    community !== null && <div className='MobileCommunityOverlay'>
        <div className='MobileCommunityOverlay__Overlap'>
            <p className='MobileCommunityOverlay__Overlap__Name'>{community.description}</p>
            <MobileCommunityStats community={community} posts={[]} />
        </div>
    </div>
  )
}

export default MobileCommunityOverlay