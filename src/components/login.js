import React 		from 'react'
import { Link } 	from 'react-router-dom'

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
					console.log('logged in')
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
		}).catch (error => console.log('error'))
	}

	componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render () {
		return (
			<div className='dropdown offset-6 col-6 justify-content-center'>
				<button className='btn btn-primary dropdown-toggle' id='dropdownMenu' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Log In</button>
				<div className='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenu'>
					<form className='px-4 py-3' onSubmit={this.handleSubmit}>
						<div className='form-group'>
							<label htmlFor='userName'></label>
							<input type='text' id='userName' name='userName' onChange={this.handleChange} value={this.state.userName} placeholder='User Name' required/>
						</div>
						<div className='form-group'>
							<label htmlFor='password'></label>
							<input type='password' id='password' name='password' onChange={this.handleChange} value={this.state.password} placeholder='Password' required/>
						</div>
						<input className='btn btn-primary' type='submit' value='Sign In'/>
					</form>
					<div className='dropdown-divider' />
					<Link to='/Create'><div className='dropdown-item'>
						New around here? Sign up!
					</div></Link>
				</div>
			</div>
		)
	}
}

export default Login