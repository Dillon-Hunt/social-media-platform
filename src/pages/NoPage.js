import MobileNavigationBar from '../components/MobileNavigationBar'

import '../styles/NoPage.css'

function NoPage() {
    return (
      <div className="NoPage">
  
        <div className="NoPage__Message">
          <h1 className="NoPage__Heading">404</h1>
          <h2 className="NoPage__Subheading">Hmm</h2>
        </div>

        <MobileNavigationBar />
  
      </div>
    );
  }
  
  export default NoPage;
  