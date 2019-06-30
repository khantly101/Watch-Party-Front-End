import React 		from 'react'
import { Link } 	from "react-router-dom"

class Header extends React.Component {
	render () {
		return (
			<div className="container-fluid header">
				<div className="row">
					<div className="col-10">
						<h2>Watch Party</h2>
					</div>
					<div className="col-2 align-self-center">
						<Link to='/'><button>New User</button></Link>
						<button>Log In</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Header