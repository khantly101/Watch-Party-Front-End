import React         	from 'react'
import ReactJWPlayer 	from 'react-jw-player'
import io				from 'socket.io-client'

class ChatRoom extends React.Component {
	state = {
		socket: io('http://localhost:3003'),
		partyRooms:[],
		partyRoomIndex: '',
		userName: 'User Name Test',
		pic: 'Pic Test',
		chatMessage: '',
		playerScript: 'https://cdn.jwplayer.com/libraries/7q9W8HVG.js',
		file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		playerId: '',
		clients: []
	}

	componentWillMount() {
		this.checkRoute()

		const { rooms } = this.props.location.state
		const { index } = this.props.location.state

		this.setState({
			partyRooms: rooms,
			partyRoomIndex: index
		}, () => {
			console.log(this.state.partyRooms)
			console.log(this.state.partyRoomIndex)

		})
	}

	checkRoute() {
		if (!this.props.location.state) {
			window.location.href = '/'
		}
	}

	socketConnect = (theRoom, roomIndex, userName, pic, socket) => {
			this.state.socket.on('connect', function() {
				console.log(`Connection made`)
				console.log(`On Connection ` + theRoom)
				console.log(`On Connection ` + userName)
				console.log(`On Connection ` + pic)
				console.log(socket.id + ' ' + socket.disconnected)
				socket.emit('clientData',theRoom,roomIndex,userName,pic,socket.id )

				// Connected, let's sign-up for to receive messages for this room
				socket.emit('room', theRoom, roomIndex, userName, pic, socket.id)
			})

		}
		deleteClient = () => {

		}

	componentDidMount() {

		this.socketConnect(this.state.partyRooms[this.state.partyRoomIndex], this.state.partyRoomIndex, this.state.userName, this.state.pic,this.state.socket)

		this.state.socket.on(`addToList`, (msg, partyRoom, roomIndex, activeClients) => {

			console.log(`newClient`)
			console.log(activeClients)

			this.setState({
				clients: activeClients
			})
		})
		this.state.socket.on(`deleteFromList`, (msg,clientId) => {
			console.log(clientId + ' ' + msg)
			let deleteClient = [...this.state.clients]
			deleteClient.filter((theClient) => {
				return theClient.sockId === clientId
			})
			alert(msg)
		})

		//Listening to responses sent from server
		this.state.socket.on(`recieveMessage`, (msg,pic,userName) => {
				 //Looking to see if we get responses back from server
				 // console.log(msg)
				 let newObject = {
					 pic: pic,
					 userName: userName,
					 message: msg
				 }
				 let partyRooms = [...this.state.partyRooms]
				 partyRooms[this.state.partyRoomIndex].messages.push(newObject)
				 this.setState({
					 partyRooms:[...this.state.partyRooms]
				 }, () => {
				 	console.log(this.state.partyRooms[this.state.partyRoomIndex].messages)
				 })
			 })

		this.state.socket.on(`play`, (msg,playerId) => {
			// console.log('Triggering ' +	msg)
			// console.log('Triggering ' + playerId)
			window.jwplayer().play()
		})

		this.state.socket.on(`stop`, (msg,playerId) => {
	 	 	// console.log('Triggering ' +	msg)
	 		// console.log('Triggering ' + playerId)
	 		window.jwplayer().stop()
 		})
	}

	componentWillUnmount() {

		this.state.socket.close()
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.state.socket.emit(`sendMessage`, this.state.chatMessage,this.state.partyRooms[this.state.partyRoomIndex]._id,this.state.pic,this.state.userName)
		this.setState({
			chatMessage: ''
		})
	}

	sendPlay = (playerId) => {
		// console.log(`Sending ` + playerId)
		console.log(this.state.partyRooms[this.state.partyRoomIndex]._id)
		this.state.socket.emit(`play`, `sendPlay` ,this.state.partyRooms[this.state.partyRoomIndex]._id,playerId)
	}

	sendStop = (playerId) => {
		// console.log(`Sending ` + playerId)
		this.state.socket.emit(`stop`, `sendStop` ,this.state.partyRooms[this.state.partyRoomIndex]._id,playerId)
	}

	render() {

		return (
			<React.Fragment>

				<button onClick={ () => { this.sendPlay() } }>Play Video</button>
			 	<button onClick={ () => { this.sendStop() } }>Stop Video</button>

				<ReactJWPlayer
					playerId= { this.state.playerId }
					playerScript= {this.state.playerScript}
					file= {this.state.file}
				/>
				<div>

				{this.state.clients.map((theClient, index) => {
					return (
						<div key={index}>
						<h1>This is current User List in Chat Room </h1>
						imagePlaceholder: {theClient.pic} username: {theClient.userName} socketId: {theClient.sockId} clientSocketIndex: {index}

						</div>
					)
				})}


				{this.state.partyRooms[this.state.partyRoomIndex].messages.map((theMessage, index) => {
					return (
						<div key={index}>
						<h1>This is current message board for chat room </h1>
						imagePlaceholder: {theMessage.pic} username: {theMessage.userName} message: {theMessage.message}

						</div>
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
