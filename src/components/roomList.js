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
			console.log(resJson)
			this.setState({
				rooms: resJson
			})
			console.log(this.state.rooms)
		}).catch (error => console.error({'Error': error}))
	}

	componentDidMount () {
		this.findRooms()
		console.log(this.state)
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
												id: room._id
											}
										}}><th>Link</th></Link>
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