import MobileHeader from '../components/MobileHeader';
import MobileStoriesView from '../components/MobileStoriesView';
import MobilePostsView from '../components/MobilePostsView';

function MobileHome() {
  return (
    <div className="MobileHome">

      <MobileHeader />
      <MobileStoriesView />
      <MobilePostsView />

    </div>
  );
}

export default MobileHome;
