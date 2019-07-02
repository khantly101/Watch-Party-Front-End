import React 		from 'react'
import { Link } 	from "react-router-dom"

class Header extends React.Component {
	render () {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-6">
						<Link to='/'><h2>Watch Party</h2></Link>
					</div>
					<div className="col-2">
						<Link to='/NewRoom'><button>New Room</button></Link>
					</div>

					{
						this.props.loggedIn ? (
							<div className="col-4 row">
								<div className="col-6 align-self-center">

								</div>
								<div className="col-3 align-self-center">
									<Link to='/Profile'><button className="btn btn-success btn-sm buttonHead">Profile</button></Link>
								</div>
								<div className="col-3 align-self-center">
									<button className="btn btn-primary btn-sm buttonHead" onClick={this.props.logout}>Logout</button>
								</div>
							</div>
						) : (
							<div className="col-4 row">
								<div className="col-6 align-self-center">

								</div>
								<div className="col-3 align-self-center">
									<Link to='/Create'><button className="btn btn-success btn-sm buttonHead">New User</button></Link>
								</div>
								<div className="col-3 align-self-center">
									<Link to='/Login'><button className="btn btn-primary btn-sm buttonHead">Log In</button></Link>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

export default Header