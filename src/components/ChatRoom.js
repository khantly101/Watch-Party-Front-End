import React from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:3003')

class ChatRoom extends React.Component {
  state = {
    chatRoom: 'Room Name Test',
    userName: 'User Name Test',
    pic: 'Pic Test'
  }

  socketInit = (chatRoom,userName,pic) => {
    socket.on('connect', function() {
      console.log(`Connection made`)
      console.log(chatRoom)
      console.log(userName)
      console.log(pic)
     // Connected, let's sign-up for to receive messages for this room
     socket.emit('room', chatRoom,userName,pic)
   })
  }

  render() {
    this.socketInit(this.state.chatRoom,this.state.userName, this.state.pic)
    return (
      <div><h1>Hello World</h1></div>
    )
  }
}

export default ChatRoom
