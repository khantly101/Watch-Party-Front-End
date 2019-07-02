import React from 'react'
import ReactJWPlayer from 'react-jw-player'
import VideoPlayer from './VideoPlayer.js'
import io from 'socket.io-client'
const socket = io('http://localhost:3003')

class ChatRoom extends React.Component {
  state = {
    chatRoom: 'Room Name Test',
    userName: 'User Name Test',
    pic: 'Pic Test',
    chatMessage: '',
    file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    clients: [],
    clientId: '',
    playerIdPre: '',
    playerId: ''
  }
  socketInit = (chatRoom,userName,pic) => {
    socket.on('connect', function() {
      console.log(`Connection made`)
      console.log(`On Connection ` + chatRoom)
      console.log(`On Connection ` + userName)
      console.log(`On Connection ` + pic)
      console.log(socket.id + ' ' + socket.disconnected)
      socket.emit('clientData',chatRoom,userName,socket.id )

     // Connected, let's sign-up for to receive messages for this room
     socket.emit('room', chatRoom,userName,pic, socket.id)
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
       socket.on(`setId`, (msg,id) => {
         let newObject = {
           sockId: id,
           playerId: 'partyVideo-' + id
         }
         this.setState({
           clients: [...this.state.clients, newObject],
           clientId: id
           // playerId: 'partyVideo'
         }, () => {
           console.log(newObject)
         })
          })

    socket.on(`play`, (msg,playerId) => {
      console.log('Triggering ' +  msg)
      console.log('Triggering ' + playerId)
      // alert(`hello`)
      window.jwplayer(this.playerId).play()
    })

    socket.on(`delete`, (msg,clientId) => {
      console.log(clientId + ' ' + msg)
       })
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }

  handleSubmit = (event) => {
  event.preventDefault()
	socket.emit(`chat message`, this.state.chatMessage,this.state.chatRoom,this.state.pic,this.state.userName)

  }

  sendPlay = (playerId) => {
    console.log(`Sending ` + playerId)
    socket.emit(`play`, `sendPlay` ,this.state.chatRoom,playerId)
  }

  render() {
    return (
      <React.Fragment>

        {
          this.state.clients.map((clientVideo, index) => {
            console.log(`Redering Player Socket Id ` + clientVideo)
            return(

              <VideoPlayer
                key={index}
                file={this.state.file}
                playerId={clientVideo.playerId}
                clientId= {clientVideo.sockId}
              />
            )

          })
        }

        <form onSubmit={this.handleSubmit}>
          <input type="text" id="chatMessage" name="chatMessage" onChange={this.handleChange} value={this.state.chatMessage} placeholder="Type Message"/>
          <input type="submit" value="SEND"/>
        </form>
    </React.Fragment>

    )
  }
}

export default ChatRoom
