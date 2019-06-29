import React from 'react';
import './App.css';

let baseURL = 'http://localhost:3003' 

class App extends React.Component {
	state = {
		user: [],
		userName: '',
		password: ''
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
			password: ''
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL, {
			method: 'POST',
			body: JSON.stringify(
				{
					userName: this.state.userName,
					password: this.state.password
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.handleAddUser(resJson)
			this.setState({
				userName: '',
				password: ''
			})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="userName"></label>
					<input type="text" id="userName" name="userName" onChange={this.handleChange} value={this.state.userName} placeholder="userName"/>
					<label htmlFor="password"></label>
					<input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"/>
					<input type="submit" value="New User"/>
				</form>
			</div>
		)
	}
}

export default App;
