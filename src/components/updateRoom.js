import React 			from 'react'
import { Redirect }		from 'react-router'

let baseURL = 'http://localhost:3003' 

class Home extends React.Component {
	state = {
		roomName: this.props.location.state.room.roomName,
		nameSpace: this.props.location.state.room.nameSpace,
		description: this.props.location.state.room.description,
		redirect: false
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
				<div>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='roomName'></label>
						<input type='text' id='roomName' name='roomName' onChange={this.handleChange} value={this.state.roomName} placeholder='Room Name' />
						<br />
						<br />
						<label htmlFor='nameSpace'></label>
						<input type='text' id='nameSpace' name='nameSpace' onChange={this.handleChange} value={this.state.nameSpace} placeholder='Name Space' />
						<br />
						<br />
						<label htmlFor='description'></label>
						<input type='test' id='description' name='description' onChange={this.handleChange} value={this.state.description} placeholder='Description' />
						<br />
						<br />
						<input className='btn btn-primary' type='submit' value='Update'/>
					</form>
				</div>
				{
					this.state.redirect ?  <Redirect to='/'/> : null
				}
			</div>
		)
	}
}

export default Home