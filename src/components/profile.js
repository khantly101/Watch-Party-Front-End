import React 		from 'react'
import { Link } 	from 'react-router-dom'
import Default 		from './Images/default.svg'

let baseURL = 'http://localhost:3003' 

class Profile extends React.Component {
	state = {
		firstName: this.props.state.firstName || '',
		lastName: this.props.state.lastName || '',
		img: this.props.state.img || '',
		info: this.props.state.info || ''
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/member/' + this.props.state.id + '/edit', {
			method: 'PUT',
			body: JSON.stringify(
				{
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					img: this.state.img,
					info: this.state.info
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.props.updateUser(this.state.firstName, this.state.lastName, this.state.img, this.state.info)
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='jumbotron bg-white'>
					<div className='float-right'>
						{
							this.props.state.img ? <img width='150px' className='img-thumbnail rounded' src={this.props.state.img} alt='Missing' /> : <img width='150px' className='img-thumbnail rounded' src={Default} alt='Missing' />
						}
					</div>
					<br />
					<h1 className='display-4'>Hello, {this.props.state.firstName} {this.props.state.lastName}</h1>
					<p className='display-12'>UserName: {this.props.state.currentUser}</p>
					<button>Edit Profile</button>
					<br />
					<hr />
					<p>About Me:</p>
					<p>{this.props.state.info}</p>
				</div>
				<br />
				<div>
					<Link to='/NewRoom'><button className="btn btn-primary btn-lg btn-block">Create Party Room</button></Link>
					<div className="table-responsive">
						<table className="table table-light">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Room Name</th>
									<th scope="col">Description</th>
									<th scope="col">Visit</th>
									<th scope="col">Edit</th>
									<th scope="col">Delete</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile



			// <div className='container-fluid'>
			// 	<div>
			// 		<h1>{this.props.state.partyrooms}</h1>
			// 	</div>
			// 	<div>
			// 		<form onSubmit={this.handleSubmit}>
			// 			<label htmlFor='firstName'></label>
			// 			<input type='text' id='firstName' name='firstName' onChange={this.handleChange} value={this.state.firstName} placeholder='First Name' />
			// 			<br />
			// 			<br />
			// 			<label htmlFor='lastName'></label>
			// 			<input type='text' id='lastName' name='lastName' onChange={this.handleChange} value={this.state.lastName} placeholder='Last Name' />
			// 			<br />
			// 			<br />
			// 			<label htmlFor='img'></label>
			// 			<input type='text' id='img' name='img' onChange={this.handleChange} value={this.state.img} placeholder='Image' />
			// 			<br />
			// 			<br />
			// 			<label htmlFor='info'></label>
			// 			<input type='text' id='info' name='info' onChange={this.handleChange} value={this.state.info} placeholder='Info' />
			// 			<br />
			// 			<br />
			// 			<input className='btn btn-primary' type='submit' value='Update'/>
			// 		</form>
			// 	</div>
			// 	<br />
			// 	<div>
			// 		<Link to='/NewRoom'><button>New Room</button></Link>
			// 	</div>
			// 	<div>
					
			// 	</div>
				
			// </div>