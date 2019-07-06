import React 			from 'react'
import { Redirect }		from 'react-router'

let baseURL = 'https://wparty.herokuapp.com'

class UpdateRoom extends React.Component {
	state = {
		roomName: '',
		nameSpace: '',
		description: '',
		upload: '',
		redirect: false
	}

	componentWillMount() {
		this.checkRoute()
		this.addState()
	}

	checkRoute = () => {
		if (!this.props.location.state) {
			window.location.href = '/'
		}
	}

	addState () {
		this.setState({
			roomName: this.props.location.state.room.roomName || '',
			nameSpace: this.props.location.state.room.nameSpace || '',
			description: this.props.location.state.room.description || '',
			upload: this.props.location.state.room.upload || ''
		})
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	onUpload = (event) => {
			this.setState({
				upload: event.target.files
			})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/partyroom/' + this.props.location.state.room._id, {
			method: 'PUT',
			body: JSON.stringify(
				{
					roomName: this.state.roomName,
					nameSpace: this.state.nameSpace,
					description: this.state.description,
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.setState({
				roomName: '',
				nameSpace: '',
				description: '',
				redirect: true
			})
		}).then (res => res.json()).catch (error => console.error({'Error': error}))
	}

	handleSubmitVid = (event) => {

	// event.preventDefault()
	// var data = event.target.files;

	// var xhr = new XMLHttpRequest();
	// xhr.withCredentials = true;

	// xhr.addEventListener('readystatechange', function () {
	// 	if (this.readyState === 4) {
	// 		console.log(this.responseText);
	// 	}
	// });

	// xhr.open('POST', baseURL + '/upload/' + this.props.location.state.room._id);
	// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// xhr.setRequestHeader('cache-control', 'no-cache');
	// xhr.setRequestHeader('Postman-Token', '7a3f3e63-e9fd-4488-b2b4-428c93d24c2f');

	// xhr.send(data);

		event.preventDefault()
		const data = new FormData()
		data.append('upload', this.state.upload)
		console.log(data)

		fetch(baseURL + '/upload/' + this.props.location.state.room._id, {
			method: 'POST',
			file: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
			
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='container bg-white rounded'>
					<br />
					<h1>Update Room</h1>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='roomName'>Room Name</label>
						<input className='form-control' type='text' id='roomName' name='roomName' onChange={this.handleChange} value={this.state.roomName} placeholder='Room Name' />
						<br />
						<label htmlFor='nameSpace'>Name Space</label>
						<input className='form-control' type='text' id='nameSpace' name='nameSpace' onChange={this.handleChange} value={this.state.nameSpace} placeholder='Name Space' />
						<br />
						<label htmlFor='description'>Description</label>
						<input className='form-control' type='text' id='description' name='description' onChange={this.handleChange} value={this.state.description} placeholder='Description' />
						<br />
						<input className='btn btn-primary' type='submit' value='Update'/>
					</form>
					<br />
				</div>
				<br />
				<div className='container bg-white rounded'>
					<br />
					<h1>Update Video</h1>
					<br />
						<form onSubmit={this.handleSubmitVid}>
							<input type="file" name="file" onChange={this.onUpload}/>
							<br />
							<br />
							<input className='btn btn-primary' type='submit' value='Upload'/>
						</form>
					<br />
				</div>
				{
					this.state.redirect ?  <Redirect to='/'/> : null
				}
			</div>
		)
	}
}

export default UpdateRoom
