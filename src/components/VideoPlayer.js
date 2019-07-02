import React from 'react'
import ReactJWPlayer from 'react-jw-player'

class VideoPlayer extends React.Component {
  state = {
    playerId: 'partyVideo',
    playerScript: 'https://cdn.jwplayer.com/libraries/7q9W8HVG.js',
  }
  render() {
    return (
      <ReactJWPlayer
      playerId= {this.state.playerId}
      playerScript= {this.state.playerScript}
      file= {this.props.file}
    />
    )
  }
}
export default VideoPlayer
