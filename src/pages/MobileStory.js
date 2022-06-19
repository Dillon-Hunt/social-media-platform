import MobileNavigationBar from '../components/MobileNavigationBar'

import { Helmet } from 'react-helmet'

function MobileStory() {
    return (
      <div className="MobileStory">
      <Helmet>
        <title>Story | Social Media App</title>
      </Helmet>
  
        <MobileNavigationBar />
  
      </div>
    );
  }
  
  export default MobileStory;