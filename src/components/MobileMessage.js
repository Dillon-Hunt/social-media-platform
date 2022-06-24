import '../styles/MobileMessage.css'

function MobileMessage(props) {
    const { message, currentUser } = props

    return (
        <div className={currentUser ? 'MobileMessage__CurrentUser' : 'MobileMessage__AlternateUser'}>
            <div className='MobileMessage'>
                <p className='MobileMessage__Text'>{message.text}</p>
            </div>
        </div>
    );
}

export default MobileMessage;