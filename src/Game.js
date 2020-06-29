import React from "react";

import { randomWord } from "./words.js"

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      behind: "",
      completed: "",
      upcoming: this.props.initial,
    }
  }

  handleKeying = (e) => {
    this.processCharacter(e.key);
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeying)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeying)
    clearInterval(this.chaser)
  }

  componentDidUpdate(prevProps) {
    this.addUpcoming()
    this.startChaser()

    if (this.chaser && prevProps.speed !== this.props.speed) {
      this.restartChaser()
    }
  }

  addUpcoming() {
    if (this.state.upcoming.length < 3) {
      this.setState({
        upcoming: this.state.upcoming.concat(" " + randomWord())
      })
    }
  }

  restartChaser() {
    this.stopChaser()
    this.chaser = setInterval(() => { this.popCompleted() }, this.props.speed)
  }

  startChaser() {
    if (this.state.completed.length >= 12 && !this.chaser) {
      this.chaser = setInterval(() => { this.popCompleted() }, this.props.speed)
    }
  }

  stopChaser() {
    clearInterval(this.chaser)
  }

  popCompleted() {
    let char = this.state.completed[0]
    
    if (char === undefined) {
      this.stopChaser()

      this.props.onGameOver()
    } else {
      this.setState({
        completed: this.state.completed.slice(1),
        behind: this.state.behind.concat(char)
      })
    }
  }

  processCharacter(char) {
    if (char === this.state.upcoming[0]) {
      this.setState({
        completed: this.state.completed.concat(char),
        upcoming: this.state.upcoming.slice(1),
      })

      this.props.onScore(1)
    } else {
      this.props.onIncorrectKey()
    }
  };


  completedStyle = {
    color: "black",
    borderRight: "solid",
    borderRightColor: "green",
    borderLeft: "solid",
    borderLeftColor: "red"
  }

  upcomingStyle = {
    color: "gray"
  }

  render() {
    return (
      <div>
        <div>
          <span>{this.state.behind}</span>
          <span style={this.completedStyle}>{this.state.completed}</span>
          <span style={this.upcomingStyle}>{this.state.upcoming}</span>
        </div>
      </div>
    );
  }
}

export default Game;
