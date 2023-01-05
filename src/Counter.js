import React, { Component } from 'react'
import { ThemeContext } from './App'

export default class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick(i) {
    this.setState(prevState => {
      return { count: prevState.count + i }
    })
  }
  render() {
    console.log('Counter rendered')
    return (
      <ThemeContext.Consumer>
        {style => (
          <div>
            <button style={style} onClick={() => this.handleClick(-1)}>
              -
            </button>
            <span>{this.state.count}</span>
            <button style={style} onClick={() => this.handleClick(1)}>
              +
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}
