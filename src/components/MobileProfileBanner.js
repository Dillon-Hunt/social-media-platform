import '../styles/MobileProfileBanner.css'

function MobileProfileBanner(props) {
  let { user } = props

  return (
    user.length !== 0 ? <img className="MobileProfileBanner" src={user.data.profileBanner} alt='' />
    : <div className="MobileProfileBanner" />
  )
}

export default MobileProfileBanner;