import MobileAccount from './MobileAccount'
import MobileProfileStats from './MobileProfileStats'
import MobileAccountContent from '../components/MobileAccountContent'

import '../styles/MobileProfileOverlay.css'

function MobileProfileOverlay(props) {
    let user = props.user

    return (
      <div className="MobileProfileOverlay">
        <MobileAccount user={user} />
        <MobileProfileStats user={user} />
        <MobileAccountContent user={user} />
      </div>
    );
  }
  
  export default MobileProfileOverlay;