import React 		from 'react'
import { Link } 	from 'react-router-dom'
import Login		from './login.js'

class Header extends React.Component {
	render () {
		return (
			<div className='container-fluid header'>
				<div className='row justify-content-between'>
					<div className='col-4'>
						<Link to='/'><h2>Watch Party</h2></Link>
					</div>
					{
						this.props.loggedIn ? (
							<div className='col-2 row align-self-center'>
								<div className="dropdown offset-6 col-6 justify-content-center">
									<button className="btn btn-primary dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu</button>
									<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">				
										<div className="dropdown-item">
											<Link to='/NewRoom'>New Room</Link>
										</div>
										<div className="dropdown-item">
											<Link to='/Profile'>Profile</Link>
										</div>
										<div className="dropdown-item">
											<button className='btn btn-primary btn-sm buttonHead' onClick={this.props.logout}>Logout</button>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className='col-2 row align-self-center'>
								<Login changeUser={this.props.changeUser}/>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

export default Header