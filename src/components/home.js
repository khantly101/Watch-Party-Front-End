import React 		from 'react'
import { Link } 	from 'react-router-dom'
import Image 		from './Images/home_page_1.jpg'

class Home extends React.Component {
	render () {
		return (
			<div className='container-fluid'>
				<div className='container jumbotron bg-white rounded'>
					<h2 className='display-4'>Group Chat Made Simple</h2>
					<p className='lead'>Easily create group chat rooms to begin your Chat Party. Chat! Chat! Chat!</p>
					<img src={Image} alt='Missing' />
					<hr className='my-4' />
					<p className='lead'>Create A Free Account And Begin Your Chat Party!</p>
					<Link to='/Create'><button className='btn btn-success btn-lg'>Create Free Account</button></Link>
				</div>
			</div>
		)
	}
}

export default Home