import React 		from 'react'
import { Link } 	from "react-router-dom"

let baseURL = 'http://localhost:3003' 

class RoomList extends React.Component {
	state = {
		rooms: []
	}

	findRooms = () => {
		fetch(baseURL + '/partyroom', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.setState({
				rooms: resJson
			})
		}).catch (error => console.error({'Error': error}))
	}

	deleteRoom = (id) => {
		fetch(baseURL + '/partyroom/' + id, {
			method: 'DELETE',
		}).then (res => {
			console.log(res)
			const findIndex = this.state.rooms.findIndex(room => room._id === id)
			const copyRoom = [...this.state.rooms]
			copyRoom.splice(findIndex, 1)
			this.setState({rooms: copyRoom})
		}).catch (error => console.error({'Error': error}))
	}

	componentDidMount () {
		this.findRooms()
	}

	render () {
		return (
			<div className="container-fluid">
				<table> 
					<tbody>
						{
							console.log(this.state.rooms)
						}
						{
							this.state.rooms.map((room, index) => {
								return (
									<tr key={index}>
										<th>{index}</th>
										<th>{room.roomName}</th>
										<th>{room.description}</th>
										<Link to={{ 
											pathname: '/Room',
											state: {
												index: index,
												id: room._id,
												rooms: this.state.rooms
											}
										}}><th>Link</th></Link>
										<th onClick={() => this.deleteRoom(room._id)}>Delete</th>
										<Link to={{ 
											pathname: '/UpdateRoom',
											state: {
												room: room
											}
										}}><th>Update</th></Link>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default RoomList