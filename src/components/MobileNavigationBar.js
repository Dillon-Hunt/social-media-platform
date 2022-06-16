import { Link } from 'react-router-dom'
import React from "react";

import '../styles/MobileNavigationBar.css'



function MobileNavigationBar() {
  let page = window.location.pathname

  return (
    <div className="MobileNavigationBar">
        <Link to={"../"}><img className="icon30" src={`../../placeholders/home${page === '/' ? '-selected' : ''}.svg`} alt="" /></Link>
        <Link to={"../search"}><img className="icon30" src={`../../placeholders/search${page.includes('/search') ? '-selected' : ''}.svg`} alt="" /></Link>
        <Link to={"../post"}><div className="MobileNavigationBar__NewPost"><img src={`../../placeholders/add.svg`} alt="" /></div></Link>
        <Link to={"../friends"}><img className="icon30" src={`../../placeholders/group${page.includes('/friends') ? '-selected' : ''}.svg`} alt="" /></Link>
        <Link to={"../profile"}><img className="icon30" src={`../../placeholders/person${page.includes('/profile') ? '-selected' : ''}.svg`} alt="" /></Link>
    </div>
  );
}

export default MobileNavigationBar;
