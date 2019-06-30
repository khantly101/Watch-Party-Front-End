import React from 'react'

class Header extends React.Component {
	render () {
		return (
			<div className="container-fluid header">
				<div className="row">
					<div className="col-10">
						<h2>Watch Party</h2>
					</div>
					<div className="col-2 align-self-center">
						<button>New User</button>
						<button>Log In</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Header