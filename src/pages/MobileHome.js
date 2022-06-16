import MobileHeader from '../components/MobileHeader'
import MobileStoriesView from '../components/MobileStoriesView'
import MobilePostsView from '../components/MobilePostsView'

import MobileNavigationBar from '../components/MobileNavigationBar'

function MobileHome(props) {
  let {posts, user} = props

  return (
    <div className="MobileHome">

      <MobileHeader />
      <MobileStoriesView />
      {
        (user && posts) ? <MobilePostsView posts={posts} user={user} /> : <p>Loading</p>
      }
      <MobileNavigationBar />

    </div>
  );
}

export default MobileHome;
