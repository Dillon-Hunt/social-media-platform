import '../styles/MobilePostsView.css'

import MobilePost from "./MobilePost";

/* import AdSense from 'react-adsense'; In the future, potentially */


function MobilePostsView(props) {
    let { posts, user } = props
    
    return (
      <div className="MobilePostsView">
        {
          posts && posts.map((post, idx) => {
            return <MobilePost key={idx} post={post} user={user} />
          })
        }
  
      </div>
    );
  }
  
  export default MobilePostsView;