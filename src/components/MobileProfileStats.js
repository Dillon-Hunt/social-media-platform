import '../styles/MobileProfileStats.css'

function MobileProfileStats(props) {
    let { user, posts } = props
    
    return (
        <div className="MobileProfileStats">
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user !== null && posts !== null ? user.data.following : "-"}</p>
                <p className="MobileProfileStats__Stat__Name">{user !== null && posts !== null ? "Following" : "-"}</p>
            </div>
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user !== null && posts !== null ? user.data.followers : "-"}</p>
                <p className="MobileProfileStats__Stat__Name">{user !== null && posts !== null ? user.data.followers === 1 ? "Follower" : "Followers" : "-"}</p>
            </div>
            <div className="MobileProfileStats__Stat">
                <p className="MobileProfileStats__Stat__Count">{user !== null && posts !== null ? posts.length : "-"}</p>
                <p className="MobileProfileStats__Stat__Name">{user !== null && posts !== null ? posts.length === 1 ? "Post" : "Posts" : "-"}</p>
            </div>
        </div>
    );
  }
  
  export default MobileProfileStats;