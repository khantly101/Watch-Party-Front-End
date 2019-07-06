import React 			from 'react'
import { Redirect }		from 'react-router'

let baseURL = 'https://wparty.herokuapp.com' 

class EditPic extends React.Component {
	state = {
		img: this.props.state.img || '',
		redirect: false
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/member/' + this.props.state.id + '/edit', {
			method: 'PUT',
			body: JSON.stringify(
				{
					img: this.state.img
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.props.updatePic(this.state.img)
			this.setState({
				redirect: true
			})
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='container bg-white rounded'>
					<br />
					<h1>Update Profile</h1>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='img'>Image</label>
						<input className='form-control' type='text' id='img' name='img' onChange={this.handleChange} value={this.state.img} placeholder='Info' />
						<br />
						<input className='btn btn-primary' type='submit' value='Update'/>
					</form>
					<br />
				</div>
				{
					this.state.redirect ?  <Redirect to='/Watch-Party-Front-End/Profile'/> : null
				}
			</div>
		)
	}
}

export default EditPic