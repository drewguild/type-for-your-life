import React from "react"

class WPMMeter extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.active && prevProps.wpm !== this.props.wpm) {
      if (this.props.wpm > this.props.upperThreshold) {
        this.props.onPassUpperThreshold()
      }


      if (this.props.wpm < this.props.lowerThreshold) {
        this.props.onPassLowerThreshold()
      }
    }
  }

  render() {
    let color
    const {active, wpm, lowerThreshold, upperThreshold} = this.props

    if (active) {
      if (wpm < lowerThreshold) {
        color = "red"
      } else if (wpm > upperThreshold) {
        color = "lightgreen"
      } else {
        color = "white"
      }
    }

    const style = {
      marginTop: "200px",
      padding: "1em",
      
      background: color,
      border: "solid black",
      borderRadius: "1em"
    }

    return (
      <div style={style}>
        <span>WPM: {this.props.wpm}</span>
      </div>
    )
  }
}

export default WPMMeter