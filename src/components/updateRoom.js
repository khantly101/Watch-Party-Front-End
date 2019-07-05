import React 			from 'react'
import { Redirect }		from 'react-router'

let baseURL = 'http://localhost:3003' 

class UpdateRoom extends React.Component {
	state = {
		roomName: '',
		nameSpace: '',
		description: '',
		redirect: false
	}

	componentWillMount() {
		this.checkRoute()
		this.addState()
	}

	checkRoute = () => {
		if (!this.props.location.state) {
			window.location.href = '/'
		} 
	}

	addState () {
		this.setState({
			roomName: this.props.location.state.room.roomName,
			nameSpace: this.props.location.state.room.nameSpace,
			description: this.props.location.state.room.description
		})
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/partyroom/' + this.props.location.state.room._id, {
			method: 'PUT',
			body: JSON.stringify(
				{
					roomName: this.state.roomName,
					nameSpace: this.state.nameSpace,
					description: this.state.description,
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			console.log(resJson)
			this.setState({
				roomName: '',
				nameSpace: '',
				description: '',
				redirect: true
			})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='container bg-white rounded'>
					<br />
					<h1>Update Room</h1>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='roomName'>Room Name</label>
						<input className='form-control' type='text' id='roomName' name='roomName' onChange={this.handleChange} value={this.state.roomName} placeholder='Room Name' />
						<br />
						<label htmlFor='nameSpace'>Name Space</label>
						<input className='form-control' type='text' id='nameSpace' name='nameSpace' onChange={this.handleChange} value={this.state.nameSpace} placeholder='Name Space' />
						<br />
						<label htmlFor='description'>Description</label>
						<input className='form-control' type='test' id='description' name='description' onChange={this.handleChange} value={this.state.description} placeholder='Description' />
						<br />
						<input className='btn btn-primary' type='submit' value='Update'/>
					</form>
					<br />
				</div>
				{
					this.state.redirect ?  <Redirect to='/'/> : null
				}
			</div>
		)
	}
}

export default UpdateRoom