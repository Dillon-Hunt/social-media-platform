import '../styles/MobileHeader.css'

import { SignOutButton } from '../pages/MobileSignIn'

let newNotifications = false

function MobileHeader(props) {
  const { name } = props

  var hours = new Date().getHours();

  let message = ""

  if (hours < 12) {
    message = "Good Morning"
  } else if (hours < 18) {
    message = "Good Afternoon"
  } else {
    message = "Good Evening"
  }


  return (
    <div className="MobileHeader">
        <h2 className="MobileHeader__Title">Hi, {name}</h2>
        <h3 className="MobileHeader__Subtitle">{message} <SignOutButton /></h3>

        <div className="NotificationBell">
            <img className="NotificationBell__Image" src={`../../assets/notifications${newNotifications ? '-active' : ''}.svg`} alt='' />
        </div>
    </div>
  );
}

export default MobileHeader;
