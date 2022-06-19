import '../styles/MobileProfileOverlay.css'

import MobileAccount from './MobileAccount'
import MobileProfileStats from './MobileProfileStats'
import MobileAccountContent from '../components/MobileAccountContent'

function MobileProfileOverlay(props) {
  const { user, posts } = props

  return (
    <div className="MobileProfileOverlay">
      <MobileAccount user={user} />
      <MobileProfileStats user={user} posts={posts} />
      <MobileAccountContent posts={posts} />
    </div>
  );
}

export default MobileProfileOverlay;