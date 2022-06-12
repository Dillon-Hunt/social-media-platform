import '../styles/MobilePost.css'

function MobilePost() {
    return (
      <div className="MobilePost">
        <div className="MobilePost__ProfileSection">
          <img className="MobilePost__ProfileIcon" src="../../placeholders/1.jpg" alt="" />
          <p className="MobilePost__Username">Dillon Hunt</p>
          <p className="MobilePost__Time">2min ago</p>
        </div>

        <div className="MobilePost__ImageSection">
          <img className="MobilePost__Image" src="../../placeholders/1.jpg" alt="" />
          <div className="MobilePost__Overlay">
            <p className="icon25 MobilePost__Overlay__Likes">1.5k</p>
            <p className="icon25 MobilePost__Overlay__Comments">250</p>
            <p className="icon25 MobilePost__Overlay__More">○ ○ ○</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default MobilePost;