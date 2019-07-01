import React 								from 'react'
import { BrowserRouter as Router, Route } 	from "react-router-dom"
import Header 								from './components/header.js'
import Home  								from './components/home.js'
import NewUser 								from './components/newUser.js'
import Login  								from './components/login.js'

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
	}

	render () {
		return (
			<Router>
				<div>
					<Header/>
					<br />
					{
						(this.state.loggedIn) ? null : <Route path='/' exact component={Home} />
					}
					<Route path='/Create' component={NewUser} />
					<Route path='/Login' changeUser={this.changeUser} currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} component={Login} />
				</div>
			</Router>
		)
	}
}

export default App
