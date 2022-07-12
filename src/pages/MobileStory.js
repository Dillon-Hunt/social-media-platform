import MobileNavigationBar from '../components/MobileNavigationBar'

import { Helmet } from 'react-helmet-async'

function MobileStory(props) {
  const { signedIn } = props
  
  return (
    <div className="MobileStory">
    <Helmet>
      <title>Story</title>
    </Helmet>

      <MobileNavigationBar />

    </div>
  );
}

export default MobileStory;