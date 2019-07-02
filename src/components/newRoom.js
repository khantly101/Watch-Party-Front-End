import React 		from 'react'

let baseURL = 'http://localhost:3003' 

class NewRoom extends React.Component {
	state = {
		roomName: '',
		nameSpace: '',
		description: ''
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/partyroom/new', {
			method: 'POST',
			body: JSON.stringify(
				{
					roomName: this.state.roomName,
					nameSpace: this.state.nameSpace,
					description: this.state.description,
					creator: this.props.state.currentUser
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			console.log(resJson)
			this.setState({
				roomName: '',
				nameSpace: '',
				description: ''
			})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className="container-fluid">
				<div>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="roomName"></label>
						<input type="text" id="roomName" name="roomName" onChange={this.handleChange} value={this.state.roomName} placeholder="Room Name" />
						<br />
						<br />
						<label htmlFor="nameSpace"></label>
						<input type="text" id="nameSpace" name="nameSpace" onChange={this.handleChange} value={this.state.nameSpace} placeholder="Name Space" />
						<br />
						<br />
						<label htmlFor="description"></label>
						<input type="textarea" id="description" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Description" />
						<br />
						<br />
						<input className="btn btn-primary" type="submit" value="Submit"/>
					</form>
				</div>
			</div>
		)
	}
}

export default NewRoom