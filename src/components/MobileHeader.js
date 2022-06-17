import '../styles/MobileHeader.css'

let newNotifications = false

function MobileHeader() {
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
        <h2 className="MobileHeader__Title">Hi, Dillon</h2>
        <h3 className="MobileHeader__Subtitle">{message}</h3>

        <div className="NotificationBell">
            <img className="NotificationBell__Image" src={`../../assets/notifications${newNotifications ? '-active' : ''}.svg`} alt='' />
        </div>
    </div>
  );
}

export default MobileHeader;
