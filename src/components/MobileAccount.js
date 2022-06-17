import '../styles/MobileAccount.css'

function MobileAccount(props) {
    let { user } = props

    return (
      <div className="MobileAccount">
        <img className="MobileAccount__ProfileIcon" src={user.data.profileIcon} alt={user.username} />
        <p className="MobileAccount__Name">{user.data.name}</p>
        <p className="MobileAccount__Username">{user.data.username}</p>
      </div>
    );
  }
  
  export default MobileAccount;