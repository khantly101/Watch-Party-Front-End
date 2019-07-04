import React 		from 'react'

let baseURL = 'http://localhost:3003' 

class Login extends React.Component {
	state = {
		userName: '',
		password: '',
		wrongPass: false,
		wrongUser: false
	}

	_isMounted = false

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({
			wrongUser: false,
			wrongPass: false
		})
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
			{
				console.log(res.status)
				if (res.status === 200) {
					console.log("logged in")
					return res.json()
				} else if (res.status === 300) {
					this.setState({
						wrongPass: true
					})
				} else if (res.status === 400) {
					this.setState({
						wrongUser: true
					})
				}
			}
		)
		.then (resJson => {
			if (!this.state.wrongPass && !this.state.wrongUser) {
				this.props.changeUser(resJson)
				if (this._isMounted) {
					this.setState({
						userName: '',
						password: ''
					})
				}
			}	
		}).catch (error => console.log("error"))
	}

	componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render () {
		return (
			<div className="container-fluid">
				<div className="container home">
					<br />
					<h1>Log In</h1>
					<br />
					<br />
					<form onSubmit={this.handleSubmit}>
						{
							(this.state.wrongUser) ? <p>Wrong User Name</p> : null
						}
						<label htmlFor="userName"></label>
						<input type="text" id="userName" name="userName" onChange={this.handleChange} value={this.state.userName} placeholder="userName" required/>
						<br />
						<br />
						{
							(this.state.wrongPass) ? <p>Wrong Password</p> : null
						}
						<label htmlFor="password"></label>
						<input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password" required/>
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