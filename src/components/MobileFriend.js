import '../styles/MobileFriend.css'

import { query, collection, where, getDocs, limit, addDoc } from 'firebase/firestore'

import { database } from '../root/App'
import { useNavigate } from 'react-router-dom'

function MobileFriend(props) {
    const { user, currentUser } = props

    const navigate = useNavigate()

    const goToChat = async () => {
        console.log(user.id, currentUser)
        let chat = await getDocs(query(collection(database, 'chats'), where(user.id, '==', true),  where(currentUser, '==', true)), limit(1))
        if (chat.docs.length !== 0) {
            navigate(`/chats/${chat.docs[0].id}`)
        } else {
            let newChat = {}
            newChat[user.id] = true
            newChat[currentUser] = true
            addDoc(collection(database, 'chats'), newChat).then(doc => {
                navigate(`/chats/${doc.id}`)
            })
        }
    }

    return (
        <div onClick={goToChat} className="MobileUserResult">
            <img className="MobileFriend__Icon" src={user.profileIcon} alt='' />
            <div className="MobileFriend__Content">
                <p className="MobileFriend__Name">{user.name}</p>
                <p className="MobileFriend__Username">{user.username}</p>
            </div>
        </div>
    );
}

export default MobileFriend;