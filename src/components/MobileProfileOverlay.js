import MobileAccount from './MobileAccount'
import MobileProfileStats from './MobileProfileStats'

import '../styles/MobileProfileOverlay.css'

function MobileProfileOverlay(props) {
    let user = props.user

    return (
      <div className="MobileProfileOverlay">
        <MobileAccount user={user} />
        <MobileProfileStats user={user} />
      </div>
    );
  }
  
  export default MobileProfileOverlay;