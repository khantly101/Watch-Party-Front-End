import React								from 'react'
import { BrowserRouter as Router, Route }	from 'react-router-dom'
import { Redirect }							from 'react-router'

import Header								from './components/header.js'
import Home									from './components/home.js'
import NewUser								from './components/newUser.js'
import Login								from './components/login.js'
import ChatRoom								from './components/ChatRoom.js'
import Profile								from './components/profile.js'
import NewRoom								from './components/newRoom.js'
import RoomList								from './components/roomList.js'

import './App.css'

class App extends React.Component {
	state = {
		currentUser : '',
		firstName: '',
		lastName: '',
		id: '',
		partyrooms: '',
		loggedIn : false
	}

	changeUser = (user) => {
		this.setState({
			currentUser: user.userName,
			firstName: user.firstName,
			lastName: user.lastName,
			id: user._id,
			partyrooms: user.partyrooms,
			loggedIn: true
		})

		if (user.img) {
			this.setState({
				img: user.img
			})
		}

		if (user.info) {
			this.setState({
				info: user.info
			})
		}


		console.log(this.state)
	}

	logout = () => {
		this.setState({
			currentUser : '',
			firstName: '',
			lastName: '',
			id: '',
			partyrooms: '',
			img: '',
			info: '',
			loggedIn : false
		})
	}

	updateUser = (first, last, img, info) => {
		this.setState({
			firstName: first,
			lastName: last,
			img: img,
			info: info
		})
	}

	render () {
		return (
			<Router>
				<div>
					<Header loggedIn={this.state.loggedIn} logout={this.logout} />
					<br />
					{
						(this.state.loggedIn) ? <Route path='/' exact component={RoomList} /> : <Route path='/' exact component={Home} />
					}
					<Route path='/Profile' render={() => (
						<Profile state={this.state} updateUser={this.updateUser} /> )}
					/>
					<Route path='/Create' component={NewUser} />
					<Route path='/Login' render={() => (
						this.state.loggedIn ? <Redirect to="/"/> : <Login changeUser={this.changeUser} />)}
					/>
					<Route path='/Room' component={ChatRoom} />
					<Route path='/NewRoom' render={() => (
						<NewRoom state={this.state} /> )}
					/>
				</div>
			</Router>
		)
	}
}

export default App
