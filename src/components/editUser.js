import React 			from 'react'
import { Redirect }		from 'react-router'

let baseURL = 'http://localhost:3003'

class EditUser extends React.Component {
	state = {
		firstName: this.props.state.firstName || '',
		lastName: this.props.state.lastName || '',
		info: this.props.state.info || '',
		redirect: false
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
					info: this.state.info
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.props.updateUser(this.state.firstName, this.state.lastName, this.state.info)
			this.setState({
				redirect: true
			})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='container bg-white rounded'>
					<br />
					<h1>Update Profile</h1>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='firstName'>First Name</label>
						<input className='form-control' type='text' id='firstName' name='firstName' onChange={this.handleChange} value={this.state.firstName} placeholder='First Name' />
						<br />
						<label htmlFor='lastName'>Last Name</label>
						<input className='form-control' type='text' id='lastName' name='lastName' onChange={this.handleChange} value={this.state.lastName} placeholder='Last Name' />
						<br />
						<label htmlFor='info'>Info</label>
						<input className='form-control' type='text' id='info' name='info' onChange={this.handleChange} value={this.state.info} placeholder='Info' />
						<br />
						<input className='btn btn-primary' type='submit' value='Update'/>
					</form>
					<br />
				</div>
				{
					this.state.redirect ?  <Redirect to='/Profile'/> : null
				}
			</div>
		)
	}
}

export default EditUser
