import React, { Component } from 'react'
// import './App.scss';
import styles from './app.module.css'

class App extends Component {
  render() {
    return (
      <div className={`app ${styles.app2}`}>
        Hello World {JSON.stringify(this.props.data)}
      </div>
    )
  }
}

export default App
