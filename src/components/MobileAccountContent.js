import { useParams, Link } from "react-router-dom";

import '../styles/MobileAccountContent.css'

function MobileAccountContent(props) {
    //let user = props.user
    let { page } = useParams()
    page === undefined && (page = 'photos')

    return (
      <div className="MobileAccountContent">
        <div className="MobileAccountContent__Navigation">
            <Link to={'../profile/photos'} className="MobileAccountContent__Navigation__Link" active={(page === 'photos').toString()}>Photos</Link>
            <Link to={'../profile/videos'} className="MobileAccountContent__Navigation__Link" active={(page === 'videos').toString()}>Videos</Link>
            <Link to={'../profile/tags'} className="MobileAccountContent__Navigation__Link" active={(page === 'tags').toString()}>Tags</Link>
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