import React from 'react'
import ReactJWPlayer from 'react-jw-player'

class VideoPlayer extends React.Component {
  state = {
    clientId: this.props.clientId,
    playerScript: 'https://cdn.jwplayer.com/libraries/7q9W8HVG.js'
  }
  render() {
    return (
      <React.Fragment>
        <ReactJWPlayer
          playerId= { this.props.playerId }
          playerScript= {this.state.playerScript}
          file= {this.props.file}
        />
      }
      {console.log(`This Id Inside Player ` + this.props.playerId)}

    </React.Fragment>
    )
  }
}
export default VideoPlayer
