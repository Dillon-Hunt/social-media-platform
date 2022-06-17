import MobileProfileBanner from '../components/MobileProfileBanner'
import MobileProfileOverlay from '../components/MobileProfileOverlay'
import MobileNavigationBar from '../components/MobileNavigationBar'

function MobileProfile(props) {
  const { user, database } = props

  return (
    <div className="MobileProfile">
        {
          user.length !== 0 && <>
            <MobileProfileBanner user={user} />
            <MobileProfileOverlay user={user} database={database} />
            <MobileNavigationBar />
          </>
        }

    </div>
  );
}

export default MobileProfile;