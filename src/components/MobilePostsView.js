import MobilePost from "./MobilePost";

import '../styles/MobilePostsView.css'

function MobilePostsView(props) {
    let { posts, user, database } = props

    return (
      <div className="MobilePostsView">

        {
          posts && posts.map((post, idx) => {
            return <MobilePost key={idx} post={post} user={user} database={database} />
          })
        }
  
      </div>
    );
  }
  
  export default MobilePostsView;