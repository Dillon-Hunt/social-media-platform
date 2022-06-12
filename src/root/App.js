// import MediaQuery from 'react-responsive';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mobile
import MobileHome from '../pages/MobileHome'
import MobileProfile from '../pages/MobileProfile'

import MobileNavigationBar from '../components/MobileNavigationBar'

// Desktop

// Other
import NoPage from '../pages/NoPage'

import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<MobileHome />} />
          <Route path='/profile' element={<MobileProfile />} />

          <Route path="*" element={<NoPage />} />
        </Routes>

        <MobileNavigationBar />

      </BrowserRouter>
    </div>
  );
}

export default App;
