import React 		from 'react'
import { Link } 	from 'react-router-dom'
import Login		from './login.js'

import AccountBox	from '@material-ui/icons/AccountBox'
import LibraryAdd	from '@material-ui/icons/LibraryAdd'
import Eject		from '@material-ui/icons/Eject'
import HomeIcon		from '@material-ui/icons/Home'
import Recent		from '@material-ui/icons/RecentActors'

class Header extends React.Component {
	render () {
		return (
			<div className='container-fluid header'>
				<div className='row justify-content-around'>
					<div className='col-9'>
						<Link to='/'><h2>Watch Party</h2></Link>
					</div>
					{
						this.props.loggedIn ? (
							<div className='col-2 row align-self-center'>
								<div className='dropdown offset-6 col-6 justify-content-center'>
									<button className='btn btn-secondary dropdown-toggle' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Menu</button>
									<div className='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenu2'>
										<Link to='/'><div className='dropdown-item'>
											<HomeIcon /> Home
										</div></Link>
										<Link to='/NewRoom'><div className='dropdown-item'>
											<LibraryAdd /> New Room
										</div></Link>
										<Link to='/Profile'><div className='dropdown-item'>
											<AccountBox /> Profile
										</div></Link>
										<Link to='/UserList'><div className='dropdown-item'>
											<Recent /> Members
										</div></Link>
										<div className='dropdown-divider' />
										<div className='dropdown-item'>
											<button className='btn btn-primary btn-sm buttonHead' onClick={this.props.logout}><Eject /> Logout </button>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className='col-2 row align-self-center'>
								<Login changeUser={this.props.changeUser} fillRoom={this.props.fillRoom}/>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

export default Header