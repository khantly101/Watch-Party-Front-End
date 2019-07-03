import React 		from 'react'
import { Link } 	from "react-router-dom"
import Default 		from './Images/default.svg'

let baseURL = 'http://localhost:3003' 

class Profile extends React.Component {
	state = {
		firstName: this.props.state.firstName || '',
		lastName: this.props.state.lastName || '',
		img: this.props.state.img || '',
		info: this.props.state.info || ''
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/member/' + this.props.state.id + "/edit", {
			method: 'PUT',
			body: JSON.stringify(
				{
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					img: this.state.img,
					info: this.state.info
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.props.updateUser(this.state.firstName, this.state.lastName, this.state.img, this.state.info)
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className="container-fluid">
				<div>
					<h1>{this.props.state.currentUser}</h1>
					<h1>{this.props.state.firstName}</h1>
					<h1>{this.props.state.lastName}</h1>
					{
						this.props.state.img ? <img src={this.props.state.img} alt="Missing" /> : <img src={Default} alt="Missing" />
					}
					<h1>{this.props.state.info}</h1>
					<h1>{this.props.state.partyrooms}</h1>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="firstName"></label>
						<input type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="First Name" />
						<br />
						<br />
						<label htmlFor="lastName"></label>
						<input type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name" />
						<br />
						<br />
						<label htmlFor="img"></label>
						<input type="text" id="img" name="img" onChange={this.handleChange} value={this.state.img} placeholder="Image" />
						<br />
						<br />
						<label htmlFor="info"></label>
						<input type="text" id="info" name="info" onChange={this.handleChange} value={this.state.info} placeholder="Info" />
						<br />
						<br />
						<input className="btn btn-primary" type="submit" value="Update"/>
					</form>
				</div>
				<br />
				<div>
					<Link to='/NewRoom'><button>New Room</button></Link>
				</div>
				<div>
					
				</div>
				
			</div>
		)
	}
}

export default Profile