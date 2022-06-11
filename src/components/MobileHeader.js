import '../styles/MobileHeader.css'

function MobileHeader() {
  return (
    <div className="MobileHeader">
        <h2 className="MobileHeader__Title">Hi, Dillon</h2>
        <h3 className="MobileHeader__Subtitle">Good Morning</h3>

        <div className="NotificationBell">
            <div className="NotificationBell__Image" notifications="true" />
        </div>
    </div>
  );
}

export default MobileHeader;
