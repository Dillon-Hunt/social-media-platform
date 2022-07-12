import MobileNavigationBar from '../components/MobileNavigationBar'

import { Helmet } from 'react-helmet-async'

function MobileCommunities(props) {
  const { signedIn } = props

  useEffect(() => {
      if (signedIn) {
          console.log("Logged In")
      } else {
          console.log("Logged Out")
      }
  }, [signedIn])

  return (
    <div className="MobileCommunities">
        <Helmet>
          <title>Community Name Here</title> {/* Add actual community name */}
        </Helmet>
        <MobileNavigationBar />

    </div>
  );
}

export default MobileCommunities;