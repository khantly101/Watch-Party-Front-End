import React 		from 'react'
import { Link } 	from 'react-router-dom'
import Default 		from './Images/default.svg'

let baseURL = 'https://wparty.herokuapp.com/'

class OtherUserList extends React.Component {
	state = {
		users: []
	}

	_isMounted = false

	findUsers = () => {
		fetch(baseURL + '/member', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			if (this._isMounted) {
				this.setState({
					users: resJson
				})
				console.log(this.state.users)
			}
			this._isMounted = false
		}).catch (error => console.log('error'))
	}

	componentDidMount () {
		this._isMounted = true
		this.findUsers()
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render () {
		return (
			<div className='container-fluid d-inline-flex profiles flex-wrap'>
				{
					this.state.users.map((user, index) => {
						return (
							<div className='card' width='18rem' key={index}>
							<Link to={{ 
									pathname: '/UserProfile',
									state: {
										user: user
									}
								}}>
								{
									(user.img) ? <img className='card-img-top userPic' src={user.img} alt='' /> : <img className='card-img-top userPic' src={Default} alt='' />
								}
							</Link>
								<div className='card-body'>
									<h5 className='card-title'>Name: {user.firstName} {user.lastName}</h5>
									<h5 className='card-title'>UserName: {user.userName}</h5>
									<p className='card-text'>{user.info}</p>
								</div>
							</div>
						)
					})
				}
					
					<Link to='/'> </Link>

			</div>
		)
	}
}

export default OtherUserList