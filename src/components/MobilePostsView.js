import MobilePost from "./MobilePost";

import '../styles/MobilePostsView.css'

// Dummy Data
let posts = [
  {
    data: {
      id: '00000001',
      time: "\"2022-06-13T07:56:18.538Z\"", /* JSON.stringify(new Date) */
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
  },
  {
    data: {
      id: '00000002',
      time: "\"2022-06-12T07:56:18.538Z\"", /* JSON.stringify(new Date) */
      tags: [
        "Nature",
        "Photography"
      ]
    },

    user: { /* This Will Just Be UserID in the future */
      id: '00000003',
      name: 'Epic Gamer',
      username: 'EpicGamer69',
      profileIcon: '../../placeholders/1.jpg',
    },

    content: {
      images: [
        "../../placeholders/1.jpg",
      ],
      text: "Look at that mountain!",
    },

    response: {
      favorites: [
        '00000001', /* This data may be used to display 'recommended' accounts / posts */
        '00000002',
        '00000003',
      ],
      comments: [
        {
          id: '00000001',
          user: "00000001",
          content: "Awesome Photo!",
          time: "\"2022-06-12T08:32:22.852Z\"",
          replying: false,
        }
      ],
    }
  },
]

function MobilePostsView() {
    return (
      <div className="MobilePostsView">

        {
          posts.map((post, idx) => {
            return <MobilePost key={idx} post={post} />
          })
        }
  
      </div>
    );
  }
  
  export default MobilePostsView;