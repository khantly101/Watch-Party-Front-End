import React 		from 'react'

class Profile extends React.Component {
	render () {
		return (
			<div className="container-fluid">
				<h1>{this.props.state.currentUser}</h1>
				<h1>{this.props.state.firstName}</h1>
				<h1>{this.props.state.lastName}</h1>
				<h1>{this.props.state.img}</h1>
				<h1>{this.props.state.info}</h1>
				<h1>{this.props.state.partyrooms}</h1>
			</div>
		)
	}
}

export default Profile