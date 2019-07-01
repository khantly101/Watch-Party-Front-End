import React from 'react'

let baseURL = 'http://localhost:3003' 

class NewUser extends React.Component {
	state = {
		user: [],
		userName: '',
		password: '',
		firstName: '',
		lastName: '',
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleAddUser = (user) => {
		const copyUser = [...this.state.user]
		copyUser.unshift(user)
		this.setState({
			user: copyUser,
			userName: '',
			password: '',
			firstName: '',
			lastName: '',
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/new', {
			method: 'POST',
			body: JSON.stringify(
				{
					userName: this.state.userName,
					password: this.state.password,
					firstName: this.state.firstName,
					lastName: this.state.lastName,
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			console.log(resJson)
			this.handleAddUser(resJson)
			this.setState({
				userName: '',
				password: '',
				firstName: '',
				lastName: '',
			})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className="container-fluid">
				<div className="container home">
					<br />
					<h1>Create Account</h1>
					<br />
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="userName"></label>
						<input type="text" id="userName" name="userName" onChange={this.handleChange} value={this.state.userName} placeholder="User Name" required/>
						<br />
						<br />
						<label htmlFor="password"></label>
						<input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" required/>
						<br />
						<br />
						<label htmlFor="firstName"></label>
						<input type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="First Name" required/>
						<br />
						<br />
						<label htmlFor="lastName"></label>
						<input type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name" required/>
						<br />
						<br />
						<input className="btn btn-primary" type="submit" value="New User"/>
					</form>
					<br />
				</div>
			</div>
		)
	}
}

export default NewUser