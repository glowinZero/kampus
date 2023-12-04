import React from 'react'
import {useNavigate, useParams} from "react-router-dom"
import NavBar from '../Navbar/NavBar'

/* const id = useParams()
 */
const ChatBody = ({messages, typingStatus, lastMessageRef}) => { 
  const navigate = useNavigate()
  

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")// PENSAR SOBRE ESTE CAMINHO
    window.location.reload()
  }
  
  return (
    <>
    <NavBar/>
      <header className='chat__mainHeader'>
          <p>Hangout with Colleagues</p>
          <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
        </header>


        <div className='message__container'>
          {messages.map(message => (
            message.name === localStorage.getItem("userName") ? (
              <div className="message__chats" key={message.id}>
            <p className='sender__name'>You</p>
            <div className='message__sender'>
                <p>{message.text}</p>
            </div>
          </div>
            ): (
              <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className='message__recipient'>
                <p>{message.text}</p>
            </div>
          </div>
            )
            ))}

          <div className='message__status'>
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />   
        </div>
    </>
  )
}

export default ChatBody