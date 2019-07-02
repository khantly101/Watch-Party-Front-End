import React from 'react'
import VideoPlayer from './VideoPlayer.js'
import io from 'socket.io-client'
const socket = io('http://localhost:3003')

class ChatRoom extends React.Component {
  state = {
    chatRoom: 'Room Name Test',
    userName: 'User Name Test',
    pic: 'Pic Test',
    chatMessage: '',
    file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
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
  componentDidMount() {

    //Initiating Client Connection and connecting to socket server
    this.socketInit(this.state.chatRoom,this.state.userName, this.state.pic)

    //Listening to responses sent from server
    socket.on(`chat message`, (msg,pic,userName) => {
         //Looking to see if we get responses back from server
         console.log(msg)
         console.log(pic)

         //We want to add returned data to chat window
         //Below is JQuery version, we want to do React Way
         // $(`#messages`).append($(`<li>`).append($(`<img>`).attr(`src`, `/${pic}`).attr(`class`, `avatar img-thumbnail rounded`)).append($(`<p>`).attr(`class`, `chat-text`).text(`${ userName } : ${msg}`)))
       })
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
  event.preventDefault()
	socket.emit(`chat message`, this.state.chatMessage,this.state.chatRoom,this.state.pic,this.state.userName)

}

  render() {
    return (
      <React.Fragment>
      <VideoPlayer
        file={this.state.file}
      />
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="chatMessage" name="chatMessage" onChange={this.handleChange} value={this.state.chatMessage} placeholder="Type Message"/>
          <input type="submit" value="SEND"/>
        </form>
    </React.Fragment>

    )
  }
}

export default ChatRoom
