import '../styles/MobileChat.css'

import MobileMessage from '../components/MobileMessage'

import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from "react-router-dom"
import { collection, orderBy, limit, query, onSnapshot, addDoc } from 'firebase/firestore'

import { auth, database } from '../root/App'

function MobileChat(props) {
  const { signedIn } = props
  let { chatId } = useParams()

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const postsEnd = useRef()

  onSnapshot(query(collection(database, `/chats/${chatId}/messages`), orderBy('time', 'desc'), limit(25)), (snapshot) => {
    snapshot.docs.map(doc => doc.data()).length !== messages.length && setMessages(snapshot.docs.map(doc => doc.data()).reverse())
  })

  const navigate = useNavigate()

  useEffect(() => {
    postsEnd.current.scrollIntoView({ behavior: 'instant'})
  }, [messages])

  useEffect(() => {
      if (!signedIn) {
        navigate('/')
      }
  }, [signedIn, navigate, messages])

  const postMessage = async (e) => {
    e.preventDefault()

    if (newMessage === "") return
    setNewMessage("")

    const message = {
      user: signedIn.uid,
      time: Date.now(),
      text: newMessage
    }

    await addDoc(collection(database, `/chats/${chatId}/messages`), message)

    postsEnd.current.scrollIntoView({ behavior: 'instant'})
  }

  return (
    <div className="MobileChat">
        <Helmet>
          <title>Person</title> {/* Add actual person name */}
        </Helmet>
        <Link to='/messages' className='MobileChat__Back'>{"< Back"}</Link>
        <div className="MobileChat__Messages">
          {
            messages.map((message, idx) => {
              return <MobileMessage key={idx} message={message} currentUser={message.user === auth.currentUser.uid} />
            })
          }
          <div ref={postsEnd} />
        </div>
        <form onSubmit={postMessage} className='MobileChat__NewMessage'>
          <input type="text"  placeholder='Start Typing Message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        </form>
    </div>
  );
}

export default MobileChat;