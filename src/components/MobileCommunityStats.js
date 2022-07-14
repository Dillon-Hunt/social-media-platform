import '../styles/MobileCommunityStats.css'

function MobileCommunityStats(props) {
    let { community, posts } = props
    
    return (
        <div className="MobileCommunityStats">
            <div className="MobileCommunityStats__Stat">
                <p className="MobileCommunityStats__Stat__Count">{community !== null && posts !== null ? posts.length : "-"}</p>
                <p className="MobileCommunityStats__Stat__Name">{community !== null && posts !== null ? posts.length === 1 ? "Post" : "Posts" : "-"}</p>
            </div>
            <div className="MobileCommunityStats__Stat">
                <p className="MobileCommunityStats__Stat__Count">{community !== null && posts !== null ? 0 : "-"}</p>
                <p className="MobileCommunityStats__Stat__Name">{community !== null && posts !== null ? 0 === 1 ? "Member" : "Members" : "-"}</p>
            </div>
            <div className="MobileCommunityStats__Stat">
                <p className="MobileCommunityStats__Stat__Count">{community !== null && posts !== null ? 2022 : "-"}</p>
                <p className="MobileCommunityStats__Stat__Name">{community !== null && posts !== null ? "Created" : "-"}</p>
            </div>
        </div>
    );
  }
  
  export default MobileCommunityStats;