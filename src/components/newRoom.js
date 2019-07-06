import React 			from 'react'
import { Redirect }		from 'react-router'

let baseURL = 'http://wparty.herokuapp.com/'

class NewRoom extends React.Component {
	state = {
		roomName: '',
		nameSpace: '',
		description: '',
		redirect: false
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/partyroom/' + this.props.state.id + '/new', {
			method: 'POST',
			body: JSON.stringify(
				{
					roomName: this.state.roomName,
					nameSpace: this.state.nameSpace,
					description: this.state.description,
					creator: this.props.state.id
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
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
					<h1>Create Room</h1>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='roomName'></label>
						<input className='form-control' type='text' id='roomName' name='roomName' onChange={this.handleChange} value={this.state.roomName} placeholder='Room Name' />
						<label htmlFor='nameSpace'></label>
						<input className='form-control' type='text' id='nameSpace' name='nameSpace' onChange={this.handleChange} value={this.state.nameSpace} placeholder='Name Space' />
						<label htmlFor='description'></label>
						<input className='form-control' type='test' id='description' name='description' onChange={this.handleChange} value={this.state.description} placeholder='Description' />
						<br />
						<input className='btn btn-primary' type='submit' value='Submit'/>
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

export default NewRoom