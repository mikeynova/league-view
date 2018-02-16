import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App'
import MySummoner from './components/MySummoner'

const Routes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={MySummoner} />
      </Switch>
    </App>
  </Router>
)

export default Routes
