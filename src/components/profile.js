import React 		from 'react'
import { Link } 	from 'react-router-dom'
import Default 		from './Images/default.svg'

class Profile extends React.Component {
	render () {
		return (
			<div className='container-fluid'>
				<div className='jumbotron bg-white'>
					<div className='float-right'>
						{
							this.props.state.img ? <img width='150px' className='img-thumbnail rounded' src={this.props.state.img} alt='Missing' /> : <img width='150px' className='img-thumbnail rounded' src={Default} alt='Missing' />
						}
					</div>
					<br />
					<h1 className='display-4'>Hello, {this.props.state.firstName} {this.props.state.lastName}</h1>
					<p className='display-12'>UserName: {this.props.state.currentUser}</p>
					<Link to='/EditProfile'><button className='btn btn-primary'>Edit Profile</button></Link>
					<br />
					<hr />
					<p>About Me:</p>
					<p>{this.props.state.info}</p>
				</div>
				<br />
				<div>
					<Link to='/NewRoom'><button className='btn btn-primary btn-lg btn-block'>Create Party Room</button></Link>
					<div className='table-responsive'>
						<table className='table table-light table-hover'>
							<thead className='thead-dark'>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Room Name</th>
									<th scope='col'>Description</th>
									<th scope='col'>Visit</th>
									<th scope='col'>Edit</th>
									<th scope='col'>Delete</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile

