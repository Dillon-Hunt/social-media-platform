import { Link } from 'react-router-dom'
import React from "react";

import '../styles/MobileNavigationBar.css'



function MobileNavigationBar() {
  let page = window.location.pathname

  return (
    <div className="MobileNavigationBar">
        <Link to={"../home"}><img className="icon30" src={`../../assets/home${page.includes('/home') ? '-selected' : ''}.svg`} alt="" /></Link>
        <Link to={"../search"}><img className="icon30" src={`../../assets/search${page.includes('/search') ? '-selected' : ''}.svg`} alt="" /></Link>
        <Link to={"../post"}><div className="MobileNavigationBar__NewPost"><img src={`../../assets/add.svg`} alt="" /></div></Link>
        <Link to={"../messages"}><img className="icon30" src={`../../assets/group${page.includes('/messages') ? '-selected' : ''}.svg`} alt="" /></Link>
        <Link to={"../profile"}><img className="icon30" src={`../../assets/person${page.includes('/profile') ? '-selected' : ''}.svg`} alt="" /></Link>
    </div>
  );
}

export default MobileNavigationBar;
