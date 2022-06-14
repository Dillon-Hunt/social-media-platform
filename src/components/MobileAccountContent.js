import { useParams } from "react-router-dom";

import '../styles/MobileAccountContent.css'

function MobileAccountContent(props) {
    //let user = props.user
    let { page } = useParams()
    page === undefined && (page = 'photos')

    return (
      <div className="MobileAccountContent">
        <div className="MobileAccountContent__Navigation">
            <a className="MobileAccountContent__Navigation__Link" href="../profile/photos" active={(page === 'photos').toString()}>Photos</a>
            <a className="MobileAccountContent__Navigation__Link" href="../profile/videos" active={(page === 'videos').toString()}>Videos</a>
            <a className="MobileAccountContent__Navigation__Link" href="../profile/tags" active={(page === 'tags').toString()}>Tags</a>
        </div>
        
        <div className="MobileAccountContent__Gallery">
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/1.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/2.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/1.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/2.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/1.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/2.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/1.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/2.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/1.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/2.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/1.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/2.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/1.jpg'} alt='' />
            <img className="MobileAccountContent__Gallery__Item" src={'../../placeholders/2.jpg'} alt='' />
        </div>
      </div>
    );
  }
  
  export default MobileAccountContent;