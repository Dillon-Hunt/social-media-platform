import '../styles/MobileProfileBanner.css'

function MobileProfileBanner(props) {
    let { user } = props
    
    return (
      <img className="MobileProfileBanner" src={user.data.profileBanner} alt='' />
    );
  }
  
  export default MobileProfileBanner;