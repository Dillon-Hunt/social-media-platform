import '../styles/MobileProfileStats.css'

function MobileProfileStats(props) {
    let user = props.user
    
    return (
        <div className="MobileProfileStats">
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user.following.length}</p>
                <p className="MobileProfileStats__Stat__Name">Following</p>
            </div>
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user.followers.length}</p>
                <p className="MobileProfileStats__Stat__Name">Followers</p>
            </div>
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user.posts.length}</p>
                <p className="MobileProfileStats__Stat__Name">Posts</p>
            </div>
        </div>
    );
  }
  
  export default MobileProfileStats;