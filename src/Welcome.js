import React from "react"

class Welcome extends React.Component{
  render() {
    const buttonStyle = {
      margine: "auto",
      padding: "24px 48px",

      background: "white"
    }
    return(
      <div>
        <h1>Type For Your Life</h1>
        <button style={buttonStyle} onClick={this.props.onStart}>Play!</button>
        <h2>How it works:</h2>
        <ol>
          <li>Type the text you see to stay ahead of the red line</li>
          <li>Incorrect keystrokes make the red line chase faster</li>
          <li>Low words-per-minute make the red line faster, but high words-per-minute slow it down</li>
          <li>Get as many characters as you can!</li>
        </ol>
      </div>
    )
  }
}

export default Welcome