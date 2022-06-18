import '../styles/MobileSearch.css'

import React, {useState} from "react";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import algoliasearch from 'algoliasearch/lite';

import { storage, database } from '../root/App';

import MobileCommunityThumbnail from '../components/MobileCommunityThumbnail'
import MobilePost from '../components/MobilePost'

import MobileNavigationBar from '../components/MobileNavigationBar'

const searchClient = algoliasearch(
  '58H0A6R0QR',
  '7afd43ecd7e90f6223a7f620e04fd982',
)


function MobileSearch(props) {
  let { user, communities } = props

  let [query, setQuery] = useState("")
  let [results, setResults] = useState([])

  let index = searchClient.initIndex("post_search")

  const updateResults = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
    index.search(query).then(async ({ hits }) => {
      await Promise.all(hits.map(async hit => {
        let user = await getDoc(doc(database, 'users', hit.user))
        hit.images = await Promise.all(hit.images.map(async image => {return await getDownloadURL(ref(storage, `posts/${image}`))}))
        hit.user = user.data()
        return { id: hit.objectID, data: hit }
      })).then(posts => {
        setResults(posts)
      })
    })
  }

  return (
    <div className="MobileSearch">

    {
      user.length !== 0 && <>
        <input className="MobileSearch__Input" placeholder="Search..." onChange={updateResults} value={query} autoFocus />
      </>
    }


      {/* Show Users Too */}
      
      {
        (query.length > 0 
        
        && 

        results.map((result, idx) => {
          return <MobilePost key={idx} post={result} user={user} />
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