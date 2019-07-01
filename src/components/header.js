import React 		from 'react'
import { Link } 	from "react-router-dom"

class Header extends React.Component {
	render () {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-10">
						<Link to='/'><h2>Watch Party</h2></Link>
					</div>
					<div className="col-1 align-self-center">
						<Link to='/Create'><button className="btn btn-success btn-sm">New User</button></Link>
					</div>
					<div className="col-1 align-self-center">
						<Link to='/Login'><button className="btn btn-primary btn-sm">Log In</button></Link>
					</div>
				</div>
			</div>
		)
	}
}

export default Header