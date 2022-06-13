import '../styles/MobileProfileBanner.css'

function MobileProfileBanner(props) {
    let user = props.user
    
    return (
      <img className="MobileProfileBanner" src={user.profileBanner} alt='' />
    );
  }
  
  export default MobileProfileBanner;