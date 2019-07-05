import React 		from 'react'
import Default 		from './Images/default.svg'

class OtherProfile extends React.Component {
	render () {
		return (
			<div className='container-fluid'>
				<div className='jumbotron bg-white'>
					<div className='float-right'>
						{
							this.props.location.state.user.img ? <img className='img-thumbnail rounded profilePic' src={this.props.location.state.user.img} alt='Missing' /> : <img className='img-thumbnail rounded profilePic' src={Default} alt='Missing' />
						}
					</div>
					<br />
					<h1 className='display-4'>Hello, {this.props.location.state.user.firstName} {this.props.location.state.user.lastName}</h1>
					<p className='display-12'>UserName: {this.props.location.state.user.userName}</p>
					<br />
					<hr />
					<p>About Me:</p>
					<p>{this.props.location.state.user.info}</p>
				</div>
				<br />
				<div>
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

export default OtherProfile