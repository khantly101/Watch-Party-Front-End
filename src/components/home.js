import React 		from 'react'
import { Link } 	from "react-router-dom"
import Image 		from './Images/home_page_1.jpg'

class Home extends React.Component {
	render () {
		return (
			<div className="container-fluid">
				<div className="container home">
					<h1>Group Chat Made Simple</h1>
					<h5>Easily create group chat rooms to begin your Chat Party. Chat! Chat! Chat!</h5>
					<img src={Image} />
					<p>Create A Free Account And Begin Your Chat Party!</p>
					<Link to='/Create'><button>Create Free Account</button></Link>
				</div>
			</div>
		)
	}
}

export default Home