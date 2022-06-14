import MobileHeader from '../components/MobileHeader';
import MobileStoriesView from '../components/MobileStoriesView';
import MobilePostsView from '../components/MobilePostsView';

function MobileHome(props) {
  let {posts, user} = props

  return (
    <div className="MobileHome">

      <MobileHeader />
      <MobileStoriesView />
      <MobilePostsView posts={posts} user={user} />

    </div>
  );
}

export default MobileHome;
