import MobileHeader from '../components/MobileHeader'
import MobileStoriesView from '../components/MobileStoriesView'
import MobilePostsView from '../components/MobilePostsView'

import MobileNavigationBar from '../components/MobileNavigationBar'

function MobileHome(props) {
  let {posts, user, database} = props

  return (
    <div className="MobileHome">

      <MobileHeader />
      <MobileStoriesView />
      <MobilePostsView posts={posts} user={user} database={database} />
      <MobileNavigationBar />

    </div>
  );
}

export default MobileHome;
