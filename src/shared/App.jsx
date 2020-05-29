import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        Hello World {JSON.stringify(this.props.data)}
      </div>
    )
  }
}

export default App
