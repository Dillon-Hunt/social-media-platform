import '../styles/MobileSearch.css'

import React, { useState, useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"
import { getDoc, doc, getDocs, collection, where, query } from "firebase/firestore"
import algoliasearch from 'algoliasearch/lite'
import { Helmet } from 'react-helmet-async'

import { database, auth } from '../root/App'

import MobileCommunityThumbnail from '../components/MobileCommunityThumbnail'
import MobilePost from '../components/MobilePost'
import MobileUserResult from '../components/MobileUserResult'

import MobileNavigationBar from '../components/MobileNavigationBar'

const searchClient = algoliasearch(
  '58H0A6R0QR',
  '7afd43ecd7e90f6223a7f620e04fd982',
)

function MobileSearch(props) {
  let { communities } = props

  let [results, setResults] = useState([])  
  let [userResults, setUserResults] = useState([])  

  let [follows, setFollows] = useState([])  
  
  const [signedIn, loading] = useAuthState(auth)
  let [user, setSetUser] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && signedIn) {
      getDoc(doc(database, 'users', signedIn.uid)).then(document => {
        if (!document.exists()) {
          navigate('/setup')
        } else {
          setSetUser({ id: document.id, data: document.data() })
          getDocs(query(collection(database, 'followers'), where('users', 'array-contains', signedIn.uid))).then(async documents => {
            let following = await documents.docs.map(document => document.id)
            setFollows(following)
          })
        }
      })
    }
  }, [signedIn, loading, navigate])

  useEffect(() => {
    if (!loading) {
      if (!signedIn) {
        navigate('/')
      }
    }
  }, [signedIn, loading, navigate])


  let index = searchClient.initIndex("post_search")
  let userIndex = searchClient.initIndex("user_search")

  const updateResults = (e) => {
    e.preventDefault()
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code !== 13) return
    index.search(e.target.value).then(({hits}) => {
      hits.forEach(hit => {
        hit.id = hit.objectID
      })
      setResults(hits)
    })

    userIndex.search(e.target.value).then(async ({ hits }) => {
      await Promise.all(hits.map(async hit => {
        return { id: hit.objectID, data: hit }
      })).then(users => {
        setUserResults(users)
      })
    })
  }

  return (
    <div className="MobileSearch">
      <Helmet>
        <title>Search | Social Media App</title>
        <meta name="description" content="Find a user, post or community here." />
      </Helmet>
    {
      user.length !== 0 && <>
        <input type="search" className="MobileSearch__Input" placeholder="Search..." onKeyUp={updateResults} autoFocus />
      </>
    }


      {/* Show Users Too */}

      {
          userResults.length > 0 &&
          userResults.map((result, idx) => {
            return <MobileUserResult key={idx} user={result} isFollowing={follows.indexOf(result.id) !== -1} currentUser={user} />
          })
      }
      
      {
        (results.length > 0 
        
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