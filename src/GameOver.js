import React from "react"

class GameOver extends React.Component {

  render() {
    return (
      <div>
        <span>Game Over</span>
        <p>Characters: {this.props.score}</p>
        <button onClick={this.props.onReplay}>Replay</button>
      </div>
    )
  }
}

export default GameOver;