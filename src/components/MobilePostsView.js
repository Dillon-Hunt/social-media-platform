import MobilePost from "./MobilePost";

import '../styles/MobilePostsView.css'

function MobilePostsView(props) {
    let { posts, user } = props

    return (
      <div className="MobilePostsView">

        {
          posts.map((post, idx) => {
            return <MobilePost key={idx} post={post} user={user} />
          })
        }
  
      </div>
    );
  }
  
  export default MobilePostsView;