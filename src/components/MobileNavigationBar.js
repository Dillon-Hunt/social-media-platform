import '../styles/MobileNavigationBar.css'

let page = window.location.pathname

function MobileNavigationBar() {
  return (
    <div className="MobileNavigationBar">
        <a href="./"><img class="icon30" src={`../../placeholders/home${page === '/' ? '-selected' : ''}.svg`} alt="home" /></a>
        <a href="./search"><img class="icon30" src={`../../placeholders/search${page.includes('/search') ? '-selected' : ''}.svg`} alt="search" /></a>
        <div class="MobileNavigationBar__NewPost"><img src={`../../placeholders/add.svg`} alt="post" /></div>
        <a href="./friends"><img class="icon30" src={`../../placeholders/group${page.includes('/friends') ? '-selected' : ''}.svg`} alt="friends" /></a>
        <a href="./profile"><img class="icon30" src={`../../placeholders/person${page.includes('/profile') ? '-selected' : ''}.svg`} alt="profile" /></a>
    </div>
  );
}

export default MobileNavigationBar;
