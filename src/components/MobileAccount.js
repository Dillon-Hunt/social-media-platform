import '../styles/MobileAccount.css'

function MobileAccount(props) {
    let { user } = props

    return (
      <div className="MobileAccount">
        {
          user.length !== 0 ? <>
            <img className="MobileAccount__ProfileIcon" src={user.data.profileIcon} alt={user.username} />
            <p className="MobileAccount__Name">{user.data.name}</p>
            <p className="MobileAccount__Username">{user.data.username}</p>
          </> : <>
            <div className="MobileAccount__ProfileIcon" style={{marginLeft: '1px'}} />
            <div className='MobileAccount__Placeholder__Name' />
            <div className='MobileAccount__Placeholder__Username' />
          </>
        }
      </div>
    );
  }
  
  export default MobileAccount;