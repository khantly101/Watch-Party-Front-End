import React from 'react'

let baseURL = 'http://localhost:3003' 

class Login extends React.Component {
	state = {
		userName: '',
		password: '',
		wrongPass: false
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/login', {
			method: 'POST',
			body: JSON.stringify(
				{
					userName: this.state.userName,
					password: this.state.password
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => 
			{if (res.status === 200) {
				console.log("logged in")
				this.props.changeUser(this.state.userName)
				
			} else {
				console.log("failed")
				this.setState({
					wrongPass: true
				})
			}
		})
		.then (resJson => {
			this.setState({
				userName: '',
				password: ''
			})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className="container-fluid">
				<div className="container home">
					<br />
					<h1>Log In</h1>
					<br />
					{
						(this.state.wrongPass) ? <p> error </p> : null 
					}
					<br />
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="userName"></label>
						<input type="text" id="userName" name="userName" onChange={this.handleChange} value={this.state.userName} placeholder="userName"/>
						<br />
						<br />
						<label htmlFor="password"></label>
						<input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"/>
						<br />
						<br />
						<input className="btn btn-primary" type="submit" value="Log In"/>
					</form>
					<br />
				</div>
			</div>
		)
	}
}

export default Login