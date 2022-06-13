import '../styles/MobileHeader.css'

let newNotifications = false

function MobileHeader() {
  return (
    <div className="MobileHeader">
        <h2 className="MobileHeader__Title">Hi, Dillon</h2>
        <h3 className="MobileHeader__Subtitle">Good Morning</h3>

        <div className="NotificationBell">
            <img className="NotificationBell__Image" src={`../../placeholders/notifications${newNotifications ? '-active' : ''}.svg`} alt='' />
        </div>
    </div>
  );
}

export default MobileHeader;
