// import MediaQuery from 'react-responsive';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mobile
import MobileHome from '../pages/MobileHome'
import MobileProfile from '../pages/MobileProfile'

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
      </BrowserRouter>
    </div>
  );
}

export default App;
