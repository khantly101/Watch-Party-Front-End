import React 								from 'react'
import { BrowserRouter as Router, Route } 	from "react-router-dom"
import Header 								from './components/header.js'
import Home  								from './components/home.js'
import NewUser 								from './components/newUser.js'
import Login  								from './components/login.js'

import './App.css'

class App extends React.Component {
	state = {
		currentUser : ''
	}

	changeUser = (user) => {
		this.setState({
			currentUser: user
		})
	}

	render () {
		return (
			<Router>
				<div>
					<Header/>
					<br />
					<Route path='/' exact component={Home} />
					<Route path='/Create' component={NewUser} />
					<Route path='/Login' changeUser={this.changeUser} component={Login} />
				</div>
			</Router>
		)
	}
}

export default App
