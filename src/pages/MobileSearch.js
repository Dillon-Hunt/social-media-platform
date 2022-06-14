import React, {useState} from "react";

import MobileResultsView from '../components/MobileResultsView'
import MobilePost from '../components/MobilePost'

import '../styles/MobileSearch.css'

function MobileSearch(props) {
  let { posts, user } = props
  let results = posts

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  if (searchInput.length > 0) {
    results = posts.filter((post) => {
      let searchTerm = searchInput.toLowerCase().replaceAll('#', '')
      return post.content.text.toLowerCase().includes(searchTerm) || post.user.name.toLowerCase().includes(searchTerm) || post.data.tags.filter(tag => {return tag.toLowerCase().includes(searchTerm)}).length !== 0
    })
  }


  return (
    <div className="MobileSearch">
      <input className="MobileSearch__Input" placeholder="Search..." onChange={handleSearchInput} value={searchInput} />
      
      {
        searchInput.length > 0 
        
        && 

        results.map((result, idx) => {
          return <MobilePost key={idx} post={result} user={user} />
        })

        || 
          
        <MobileResultsView />
      }
    </div>
  );
}

export default MobileSearch;