import '../styles/MobileAccountContent.css'

import { useParams, Link } from "react-router-dom";

function MobileAccountContent(props) {
    const { posts } = props
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
            {
              posts.length !== 0 ?
              posts.map((post, idx) => {
                return <img key={idx} className="MobileAccountContent__Gallery__Item" src={post.data.images[0]} alt='' />
              }) : [...Array(9)].map((e, idx) =>  <div key={idx} className="MobileAccountContent__Gallery__Item" />)
            }
        </div>
      </div>
    );
  }
  
  export default MobileAccountContent;