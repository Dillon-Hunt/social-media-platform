import '../styles/MobilePost.css'

// Dummy Data
let post = {
  data: {
    id: '00000001',
    time: "\"2022-06-12T08:32:22.852Z\"",
    tags: [
      "Mountains",
      "Nature",
    ]
  },

  user: { /* This Will Just Be UserID in the future */
    id: '00000002',
    name: 'Dillon Hunt',
    username: 'Dillon_Hunt',
    profileIcon: '../../placeholders/1.jpg',
  },

  content: {
    images: [
      "../../placeholders/1.jpg",
    ],
    text: "Gorgeous mountain range over the country side down near the big THING everyone is talking about.",
  },

  response: {
    favorites: [
      '00000001', /* This data may be used to display 'recommended' accounts / posts */
      '00000002',
      '00000003',
      '00000004',
    ],
    comments: [
      {
        id: '00000001',
        user: "00000001",
        content: "Great Photo!",
        time: "\"2022-06-12T08:32:22.852Z\"",
        replying: false,
      }
    ],
  }
}

let user = {
  id: '00000001',
  name: 'Dillon Hunt',
  username: 'Dillon_Hunt',
  profileIcon: '../../placeholders/1.jpg',
  favorites: [
    '00000001'
  ]
}

// JSON.stringify(new Date), Make a function to choose between displaying sec, min, hour ect.
// Make function to display 1000s of likes as 'k'

function MobilePost() {
    return (
      <div className="MobilePost">
        <div className="MobilePost__ProfileSection">
          <img className="MobilePost__ProfileIcon" src="../../placeholders/1.jpg" alt="" />
          <p className="MobilePost__Username">{post.user.name}</p>
          <p className="MobilePost__Time">{Math.floor((Date.now() - new Date(JSON.parse(post.data.time))) / 60000) + "min ago"}</p>
        </div>

        <div className="MobilePost__ImageSection">
          <img className="MobilePost__Image" src="../../placeholders/1.jpg" alt="" />
          <div className="MobilePost__Overlay">
            <div className="icon25">
              <img className="MobilePost__Overlay__Icon" src={`../../placeholders/favorite${user.favorites.includes(post.data.id) ? "-filled" : ""}.svg`} alt="favorite" />
              <p className="MobilePost__Overlay__Likes"><strong>{post.response.favorites.length}</strong></p>
            </div>


            <div className="icon25">
              <img className="MobilePost__Overlay__Icon" src="../../placeholders/comment.svg" alt="comment" />
              <p className="MobilePost__Overlay__Comments"><strong>{post.response.comments.length}</strong></p>
            </div>

            <div className="icon25 MobilePost__Overlay__More">
              <img className="MobilePost__Overlay__Icon" src="../../placeholders/more.svg" alt="more" />
            </div>
          </div>
        </div>


        <div className="MobilePost__CaptionSection">
          <p className="MobilePost__Content">Gorgeous mountain range over the country side down near the big THING everyone is talking about.</p>
          <div className="MobilePost__Tags">
            <p>#Mountains</p> {/* These will be <a></a> tags at some point */}
            <p>#Nature</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default MobilePost;