import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import TestContent from './components/TestContent'
import BoilingVerdict from './components/BoilingVerdict'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import aelf from 'aelfjs'

require('../style/index.scss');

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span className="red-span">{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
        <BoilingVerdict
          celsius={parseFloat(value)} />
      </div>
    )
  }
}

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    {/*<Router>
      <Route path="/" component={App} />
    </Router>*/}
    <App />
  </Provider>,
  document.getElementById('root')
)