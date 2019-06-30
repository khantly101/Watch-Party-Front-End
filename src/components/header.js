import React 		from 'react'
import { Link } 	from "react-router-dom"

class Header extends React.Component {
	render () {
		return (
			<div className="container-fluid header">
				<div className="row">
					<div className="col-10">
						<Link to='/'><h2>Watch Party</h2></Link>
					</div>
					<div className="col-2 align-self-center">
						<Link to='/Create'><button>New User</button></Link>
						<Link to='/Login'><button>Log In</button></Link>
					</div>
				</div>
			</div>
		)
	}
}

export default Header