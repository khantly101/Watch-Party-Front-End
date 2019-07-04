import React			from 'react'
import ReactJWPlayer	from 'react-jw-player'
// import VideoPlayer		from './VideoPlayer.js'
import io				from 'socket.io-client'

const socket = io('http://localhost:3003')

class ChatRoom extends React.Component {
	state = {
		chatRoom: 'Room Name Test',
		userName: 'User Name Test',
		pic: 'Pic Test',
		chatMessage: '',
		playerScript: 'https://cdn.jwplayer.com/libraries/7q9W8HVG.js',
		file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		playerId: '',
		clients: [],
		clientId: '',
		messages: [],
	}
	socketConnect = (chatRoom,userName,pic) => {
			socket.on('connect', function() {
				console.log(`Connection made`)
				console.log(`On Connection ` + chatRoom)
				console.log(`On Connection ` + userName)
				console.log(`On Connection ` + pic)
				console.log(socket.id + ' ' + socket.disconnected)
				socket.emit('clientData',chatRoom,userName,socket.id )

				// Connected, let's sign-up for to receive messages for this room
				socket.emit('room', chatRoom,userName,pic,socket.id)
			})

		}

	componentDidMount() {

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
		//Listening to responses sent from server
		socket.on(`recieveMessage`, (msg,pic,userName) => {
				 //Looking to see if we get responses back from server
				 console.log(msg)
				 // console.log(pic)
				 this.setState({
					 messages:[...this.state.messages, msg]
				 })
			 })

		socket.on(`play`, (msg,playerId) => {
			console.log('Triggering ' +	msg)
			console.log('Triggering ' + playerId)
			// alert(`hello`)
			window.jwplayer().play()
		})

		socket.on(`stop`, (msg,playerId) => {
	 	 	console.log('Triggering ' +	msg)
	 		console.log('Triggering ' + playerId)
	 		// alert(`hello`)
	 		window.jwplayer().stop()
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
		socket.emit(`sendMessage`, this.state.chatMessage,this.state.chatRoom,this.state.pic,this.state.userName)
		this.setState({
			chatMessage: ''
		})
	}
	sendPlay = (playerId) => {
		console.log(`Sending ` + playerId)
		socket.emit(`play`, `sendPlay` ,this.state.chatRoom,playerId)
	}

	sendStop = (playerId) => {
		// console.log(`Sending ` + playerId)
		socket.emit(`stop`, `sendStop` ,this.state.chatRoom,playerId)
		// window.jwplayer().stop()
	}

	render() {
		return (
			<React.Fragment>
				{this.socketConnect(this.state.chatRoom,this.state.userName, this.state.pic)}

				<button onClick={ () => { this.sendPlay() } }>Play Video</button>
			 	<button onClick={ () => { this.sendStop() } }>Stop Video</button>

				<ReactJWPlayer
					playerId= { this.state.playerId }
					playerScript= {this.state.playerScript}
					file= {this.state.file}
				/>
				<div>
					{this.state.messages.map((theMessage, index) => {
						return (
							<div key={index}>{theMessage}</div>
						)
					})}
				</div>
				<form onSubmit={this.handleSubmit}>
					<input type='text' id='chatMessage' name='chatMessage' onChange={this.handleChange} value={this.state.chatMessage} placeholder='Type Message'/>
					<input type='submit' value='SEND'/>
				</form>
			</React.Fragment>
		)
	}
}

export default ChatRoom
