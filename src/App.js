import React								from 'react'
import { BrowserRouter as Router, Route }	from 'react-router-dom'
import { Redirect }							from 'react-router'

import Header								from './components/header.js'
import Home									from './components/home.js'
import NewUser								from './components/newUser.js'
import ChatRoom								from './components/ChatRoom.js'
import Profile								from './components/profile.js'
import NewRoom								from './components/newRoom.js'
import RoomList								from './components/roomList.js'
import UpdateRoom							from './components/updateRoom.js'
import EditUser								from './components/editUser.js'
import OtherUserList						from './components/otherUserList.js'
import OtherProfile							from './components/otherProfile.js'
import EditPic								from './components/editPic.js'

import './App.css'

let baseURL 	= 'https://wparty.herokuapp.com' 
let savedLogin 	= localStorage.getItem('Data') ? JSON.parse(localStorage.getItem('Data')) : {}

class App extends React.Component {
	state = {
		currentUser : savedLogin.currentUser || '',
		firstName: savedLogin.firstName || '',
		lastName: savedLogin.lastName || '',
		id: savedLogin.id || '',
		partyrooms: savedLogin.partyrooms || [],
		img: savedLogin.img || '',
		info: savedLogin.info || '',
		loggedIn: savedLogin.loggedIn || false,
	}

	componentWillMount() {
		if (this.state.loggedIn) {
			this.fillRoom()
		}
	}

	fillRoom = () => {
		fetch(baseURL + '/member/' + this.state.id + '/room', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.setState({
				partyrooms: resJson
			})
		}).catch (error => console.error({'Error': error}))
		localStorage.setItem('Data', JSON.stringify(this.state))
		savedLogin = this.state
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

		localStorage.setItem('Data', JSON.stringify(this.state))
		savedLogin = this.state
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
		localStorage.clear()
	}

	updateUser = (first, last, info) => {
		this.setState({
			firstName: first,
			lastName: last,
			info: info
		})

		localStorage.setItem('Data', JSON.stringify(this.state))
		savedLogin = this.state
	}

	updatePic = (img) => {
		this.setState({
			img: img
		})

		localStorage.setItem('Data', JSON.stringify(this.state))
		savedLogin = this.state
	}

	render () {
		return (
			<Router>
				<div>
					<Header loggedIn={this.state.loggedIn} logout={this.logout} changeUser={this.changeUser}/>
					<br />
					{
						(this.state.loggedIn) ? <Route path='/Watch-Party-Front-End/' exact render={() => (<RoomList fillRoom={this.fillRoom} state={this.state}/>)} /> : <Route path='/' exact component={Home} />
					}
					{
						(this.state.loggedIn) ? <Redirect to='/Watch-Party-Front-End/'/> : <Route path='/Watch-Party-Front-End/Create' component={NewUser} />
					}
					{
						(this.state.loggedIn) ?
								<div>
									<Route path='/Watch-Party-Front-End/Profile' render={() => (
										<Profile state={this.state} fillRoom={this.fillRoom} /> )}
									/>
									<Route path='/Watch-Party-Front-End/EditProfile' render={() => (
										<EditUser state={this.state} updateUser={this.updateUser} /> )}
									/>
									<Route path='/Watch-Party-Front-End/EditPic' render={() => (
										<EditPic state={this.state} updatePic={this.updatePic} /> )}
									/>
									<Route path='/Watch-Party-Front-End/Room' component={ChatRoom} />
									<Route path='/Watch-Party-Front-End/NewRoom' render={() => (
										<NewRoom state={this.state} /> )}
									/>
									<Route path='/Watch-Party-Front-End/UpdateRoom' component={UpdateRoom} />
									<Route path='/Watch-Party-Front-End/UserList' component={OtherUserList} />
									<Route path='/Watch-Party-Front-End/UserProfile' component={OtherProfile} />
								</div>
						:
							<Redirect to='/Watch-Party-Front-End/'/>
					}
				</div>
			</Router>
		)
	}
}

export default App
