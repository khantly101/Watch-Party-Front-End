import React from 'react'
import NewUser from './components/newUser.js'
import Header from './components/header.js'


import './App.css'

class App extends React.Component {
	state = {

	}

	render () {
		return (
			<div>
				<Header/>
				<br />
				<NewUser />
			</div>
		)
	}
}

export default App
