import '../styles/NoPage.css'

import MobileNavigationBar from '../components/MobileNavigationBar'
import { Helmet } from 'react-helmet-async'

function NoPage() {
    return (
      <div className="NoPage">
        <Helmet>
          <title>404 | Page Not Found</title>
          <meta name="description" content="Well that's unfortunate." />
        </Helmet>
  
        <div className="NoPage__Message">
          <h1 className="NoPage__Heading">404</h1>
          <h2 className="NoPage__Subheading">Hmm</h2>
        </div>

        <MobileNavigationBar />
  
      </div>
    );
  }
  
  export default NoPage;
  