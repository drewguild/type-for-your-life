import React from "react";
import Game from "./Game"
import GameOver from "./GameOver"
import Welcome from "./Welcome"
import WPMMeter from "./WPMMeter"

const MODE = {
  PREGAME: "pregame",
  PLAYING: "playing",
  GAME_OVER: "game_over"
}

const INITIAL_PHRASE = "Ready set go"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: MODE.PREGAME,
      score: 0,

      speed: 350, // speed of chaser

      //WPM Related - perhaps relocate
      wpm: 0,
      wpmSample: 0,
    }
  }

  componentDidMount() {
    this.initializeWPMCalculator()
  }

  componentWillUnmount() {
    clearInterval(this.wpmCalculator)
  }

  initializeWPMCalculator() {
    let seconds = 2
    this.wpmCalculator = setInterval(() => { this.calculateWPM(seconds) }, seconds * 1000)
  }
  
  calculateWPM(seconds) {
    let wpm = (this.state.wpmSample * (60 / seconds)) / 5
    this.setState({ 
      wpm: wpm,
      wpmSample: 0
    })
  }

  gameOver() {
    this.setState({ mode: MODE.GAME_OVER })
  }

  decreaseSpeed() {
    this.setState({ speed: this.state.speed + 25 })
  }

  increaseSpeed() {
    this.setState({ speed: [this.state.speed - 25, 0].sort()[1] })
  }

  increaseScore(integer) {
    this.setState({ score: this.state.score + integer})
  }

  incrementWPMSample() {
    this.setState({ wpmSample: this.state.wpmSample + 1})
  }

  replay() {
    this.setState({ 
      mode: MODE.PLAYING,
      score: 0
    })
  }

  render() {
    let content, sidebar;

    switch (this.state.mode) {
      case MODE.PREGAME:
        content = <Welcome onStart={() => this.replay()}/>
        break;
      case MODE.PLAYING:
        content = <Game 
          initial={INITIAL_PHRASE}
          speed={this.state.speed}
          onGameOver={() => this.gameOver()}
          onIncorrectKey={() => this.increaseSpeed()}
          onScore={(int) => {
            this.increaseScore(int)
            this.incrementWPMSample()
          }}
        />;

        sidebar = <WPMMeter
          active={this.state.score > INITIAL_PHRASE.length} 
          lowerThreshold={30}
          upperThreshold={90}
          wpm={this.state.wpm} 
          onPassLowerThreshold={() => this.increaseSpeed() }
          onPassUpperThreshold={() => this.decreaseSpeed() }
        />

        break;
      case MODE.GAME_OVER:
        content = <GameOver 
          score={this.state.score}
          onReplay={() => this.replay()}  
        />;
        break
      default:
        break
    }

    const mainStyle = {
      float: "left",
      fontSize: "48px",
    }

    const sidebarStyle = {
      float: "left",
      marginRight: "50px",
    }

    return (
      <div className="container">
        <div id="sidebar" style={sidebarStyle}>
          {sidebar}
        </div>
        <div id="main" style={mainStyle}>
          {content}
        </div>
      </div>
    )
  }
}

export default App;
