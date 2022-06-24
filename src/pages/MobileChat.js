import '../styles/MobileChat.css'

import MobileMessage from '../components/MobileMessage'

import { useParams } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from "react-router-dom"
import { collection, orderBy, limit, query, onSnapshot, addDoc } from 'firebase/firestore'

import { auth, database } from '../root/App'

function MobileChat() {
  let { chatId } = useParams()

  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  onSnapshot(query(collection(database, `/chats/${chatId}/messages`), orderBy('time'), limit(25)), (snapshot) => {
    setMessages(snapshot.docs.map(doc => doc.data()))
  })

  const [signedIn, loading] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
      if (!loading) {
        if (signedIn) {
        } else {
          navigate('/')
        }
      }
  }, [signedIn, loading, navigate])

  const postMessage = (e) => {
    e.preventDefault()

    if (newMessage === "") return

    const message = {
      user: signedIn.uid,
      time: Date.now(),
      text: newMessage
    }

    addDoc(collection(database, `/chats/${chatId}/messages`), message)

    setNewMessage("")
  }

  return (
    <div className="MobileChat">
        <Helmet>
          <title>Person | Social Media App</title> {/* Add actual person name */}
        </Helmet>
        <Link to='/friends' className='MobileChat__Back'>{"< Back"}</Link>
        {
          messages && messages.map((message, idx) => {
            return <MobileMessage key={idx} message={message} currentUser={message.user === auth.currentUser.uid} />
          })
        }
        <form onSubmit={postMessage} className='MobileChat__NewMessage'>
          <input type="text" placeholder='Start Typing Message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        </form>
    </div>
  );
}

export default MobileChat;