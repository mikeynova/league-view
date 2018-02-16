import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Layout from '../Layout'
import Main from '../Main'

class App extends Component {
  render() {
    const { children } = this.props

    return (
      <Layout>
        <Main>
          {children}
        </Main>
      </Layout>
    )
  }
}

export default withRouter(App)
