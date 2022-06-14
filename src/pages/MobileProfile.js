import MobileProfileBanner from '../components/MobileProfileBanner'
import MobileProfileOverlay from '../components/MobileProfileOverlay'

import MobileNavigationBar from '../components/MobileNavigationBar'

let user = {
  id: '00000001',
  name: 'Dillon Hunt',
  username: 'Dillon_Hunt',
  profileIcon: '../../placeholders/1.jpg',
  profileBanner: '../../placeholders/2.jpg',
  favorites: [
      '00000001'
  ],
  following: [
    '00000002',
    '00000003',
    '00000004',
  ],
  followers: [
    '00000002',
    '00000003',
    '00000004',
    '00000005',
  ],
  posts: [
    '00000001',
    '00000002',
    '00000003',
    '00000004',
    '00000005',
    '00000006',
  ]
}

function MobileProfile() {
    return (
      <div className="MobileProfile">
  
        <MobileProfileBanner user={user} />
        <MobileProfileOverlay user={user} />
        <MobileNavigationBar />
  
      </div>
    );
  }
  
  export default MobileProfile;