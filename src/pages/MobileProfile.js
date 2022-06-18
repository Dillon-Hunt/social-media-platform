import MobileProfileBanner from '../components/MobileProfileBanner'
import MobileProfileOverlay from '../components/MobileProfileOverlay'
import MobileNavigationBar from '../components/MobileNavigationBar'


function MobileProfile(props) {
  const { user } = props

  return (
    <div className="MobileProfile">
      <MobileProfileBanner user={user} />
      <MobileProfileOverlay user={user} />
      <MobileNavigationBar />
    </div>
  );
}

export default MobileProfile;