import '../styles/MobileStoryThumbnail.css'

function MobileStoryThumbnail(props) {
    const { story } = props
    
    return (
      <div className="MobileStoryThumbnail">

        <img className="MobileStoryThumbnail__Image" src={story.stories[0].image} alt='' />
        
        <p className="MobileStoryThumbnail__Username">{story.name}</p>
  
      </div>
    );
  }
  
  export default MobileStoryThumbnail;