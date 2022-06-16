import React, {useState} from "react";

import MobileCommunityThumbnail from '../components/MobileCommunityThumbnail'
import MobilePost from '../components/MobilePost'

import MobileNavigationBar from '../components/MobileNavigationBar'

import '../styles/MobileSearch.css'

function MobileSearch(props) {
  let { posts, user, communities, database } = props
  let results = posts

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  if (searchInput.length > 0) {
    results = posts.filter((post) => {
      let searchTerm = searchInput.toLowerCase().replaceAll('#', '') /* Search For Users As Well */
      return post.data.text.toLowerCase().includes(searchTerm)|| post.data.tags.filter(tag => {return tag.toLowerCase().includes(searchTerm)}).length !== 0
    })
  }


  return (
    <div className="MobileSearch">
      <input className="MobileSearch__Input" placeholder="Search..." onChange={handleSearchInput} value={searchInput} />
      
      {/* Show Users Too */}

      {
        (searchInput.length > 0 
        
        && 

        results.map((result, idx) => {
          return <MobilePost key={idx} post={result} user={user} database={database} />
        }))

        || 
          
        communities.map((community, idx) => {
          return <MobileCommunityThumbnail key={idx} community={community} />
        })
      }

      <MobileNavigationBar />
    </div>
  );
}

export default MobileSearch;