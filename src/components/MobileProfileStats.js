import '../styles/MobileProfileStats.css'

function MobileProfileStats(props) {
    let { user, posts } = props
    
    return (
        <div className="MobileProfileStats">
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user.data.following.length}</p>
                <p className="MobileProfileStats__Stat__Name">Following</p>
            </div>
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user.data.followers.length}</p>
                <p className="MobileProfileStats__Stat__Name">Followers</p>
            </div>
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{posts}</p>
                <p className="MobileProfileStats__Stat__Name">Posts</p>
            </div>
        </div>
    );
  }
  
  export default MobileProfileStats;