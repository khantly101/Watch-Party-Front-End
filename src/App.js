import React 								from 'react'
import { BrowserRouter as Router, Route } 	from "react-router-dom"
import NewUser 								from './components/newUser.js'
import Header 								from './components/header.js'


import './App.css'

class App extends React.Component {
	state = {

	}

	render () {
		return (
			<Router>
				<div>
					<Header/>
					<br />
					<Route path='/' exact component={NewUser} />
				</div>
			</Router>
		)
	}
}

export default App
