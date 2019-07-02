import React from 'react'
import ReactJWPlayer from 'react-jw-player'

class VideoPlayer extends React.Component {
  state = {
    playerScript: 'https://cdn.jwplayer.com/libraries/7q9W8HVG.js'
  }
  render() {
    return (
      <React.Fragment>
        <ReactJWPlayer
          playerId= {`partyVideo-` + this.props.id}
          playerScript= {this.state.playerScript}
          file= {this.props.file}
        />
    </React.Fragment>
    )
  }
}
export default VideoPlayer
