import React 								from 'react'
import { BrowserRouter as Router, Route } 	from 'react-router-dom'
import { Redirect } 						from 'react-router'
import Header 								from './components/header.js'
import Home  								from './components/home.js'
import NewUser 								from './components/newUser.js'
import Login  								from './components/login.js'
// import ChatRoom 							from './components/ChatRoom.js'

// <Route path='/Room' component={ChatRoom} />

import './App.css'

class App extends React.Component {
	state = {
		currentUser : '',
		loggedIn : false
	}

	changeUser = (user) => {
		this.setState({
			currentUser: user,
			loggedIn: true
		})
		console.log(this.state)
	}

	logout = () => {
		this.setState({
			currentUser: '',
			loggedIn: false
		})
	}

	render () {
		return (
			<Router>
				<div>
					<Header loggedIn={this.state.loggedIn} logout={this.logout} />
					<br />
					{
						(this.state.loggedIn) ? null : <Route path='/' exact component={Home} />
					}
					<Route path='/Create' component={NewUser} />
					<Route path='/Login' render={() => (
						this.state.loggedIn ? <Redirect to="/"/> : <Login  changeUser={this.changeUser} />)}
					/>
				</div>
			</Router>
		)
	}
}

export default App
