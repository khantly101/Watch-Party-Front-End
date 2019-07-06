import React 		from 'react'
import { Link } 	from 'react-router-dom'
import Default 		from './Images/default.svg'

let baseURL 	= 'https://wparty.herokuapp.com' 

class Profile extends React.Component {
	state = {
		rooms: this.props.state.partyrooms
	}

	componentDidMount () {
		this.props.fillRoom()
	}

	deleteRoom = (id) => {
		fetch(baseURL + '/partyroom/' + id, {
			method: 'DELETE',
		}).then (res => {
			const findIndex = this.state.rooms.findIndex(room => room._id === id)
			const copyRoom = [...this.state.rooms]
			copyRoom.splice(findIndex, 1)
			this.setState({rooms: copyRoom})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='jumbotron bg-white'>
					<div className='float-right'>
						{
							this.props.state.img ? <img className='img-thumbnail rounded profilePic' src={this.props.state.img} alt='Missing' /> : <img className='img-thumbnail rounded profilePic' src={Default} alt='Missing' />
						}
					</div>
					<br />
					<h1 className='display-4'>Hello, {this.props.state.firstName} {this.props.state.lastName}</h1>
					<p className='display-12'>UserName: {this.props.state.currentUser}</p>
					<Link to='/EditProfile'><button className='btn btn-secondary'>Edit Profile</button></Link>
					<Link to='/EditPic'><button className='btn btn-secondary second'>Upload Profile Picture</button></Link>
					<br />
					<hr />
					<p>About Me:</p>
					<p>{this.props.state.info}</p>
				</div>
				<br />
				<div>
					<Link to='/NewRoom'><button className='btn btn-primary btn-lg btn-block'>Create Party Room</button></Link>
					<div className='table-responsive'>
						<table className='table table-light table-hover'>
							<thead className='thead-dark'>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Room Name</th>
									<th scope='col'>Description</th>
									<th scope='col'>Visit</th>
									<th scope='col'>Delete</th>
									<th scope='col'>Edit</th>
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
														name: room.roomName,
														index: index,
														id: room._id,
														rooms: this.state.rooms,
														currentUser: this.props.state.id,
														user: this.props.state.currentUser,
														img: this.props.state.img,
														creator: room.creator
													}
												}}>Link</Link></th>
												<th onClick={() => this.deleteRoom(room._id)}>Delete</th>
												<th><Link to={{ 
													pathname: '/UpdateRoom',
													state: {
														room: room
													}
												}}>Update</Link></th>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile

