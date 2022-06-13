import '../styles/MobileAccount.css'

function MobileAccount(props) {
    let user = props.user

    return (
      <div className="MobileAccount">
        <img className="MobileAccount__ProfileIcon" src={user.profileIcon} alt={user.username} />
        <p className="MobileAccount__Name">{user.name}</p>
        <p className="MobileAccount__Username">{user.username}</p>
      </div>
    );
  }
  
  export default MobileAccount;