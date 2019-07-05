import React 		from 'react'
import { Link } 	from 'react-router-dom'

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

	componentDidMount () {
		this.findRooms()
		this.props.fillRoom()
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className="jumbotron bg-white">
					<h1 className="display-4">Browse Party Rooms</h1>
					<p className="lead"></p>
					<p className="lead"></p>
					<hr className="my-4" />
					<p></p>
				</div>

				<div className="table-responsive">
					<table className="table table-light table-hover">
						<thead className="thead-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Room Name</th>
								<th scope="col">Description</th>
								<th scope="col">Visit</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.rooms.map((room, index) => {
									return (
										<tr key={index}>
											<th>{index}</th>
											<th>{room.roomName}</th>
											<th>{room.description}</th>
											<th><Link to={{ 
												pathname: '/Room',
												state: {
													index: index,
													id: room._id,
													rooms: this.state.rooms
												}
											}}>Link</Link></th>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default RoomList


						