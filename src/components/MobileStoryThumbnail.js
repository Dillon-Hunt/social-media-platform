import '../styles/MobileStoryThumbnail.css'

function MobileStoryThumbnail(props) {
    const { story } = props
    
    return (
      <div className="MobileStoryThumbnail">

        <img className="MobileStoryThumbnail__Image" src={story.data.images[0]} alt='' />
        
        <p className="MobileStoryThumbnail__Username">{story.data.user.name}</p>
  
      </div>
    );
  }
  
  export default MobileStoryThumbnail;