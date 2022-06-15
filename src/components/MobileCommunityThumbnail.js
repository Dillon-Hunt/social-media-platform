import '../styles/MobileCommunityThumbnail.css'

function MobileCommunityThumbnail(props) {
    let { community } = props

    return (
      <div className="MobileCommunityThumbnail">
        <img className="MobileCommunityThumbnail__Image" src={community.banner} alt="" />
        
        <div className="MobileCommunityThumbnail__Information">
            <p className="MobileCommunityThumbnail__Name">{community.name}</p>
            <p className="MobileCommunityThumbnail__Description">{community.description}</p>
        </div>
  
      </div>
    );
  }
  
  export default MobileCommunityThumbnail;