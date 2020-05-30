import React, { Component } from 'react'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className={'app'}>
        Hello World {JSON.stringify(this.props.data)}
      </div>
    )
  }
}

export default App
