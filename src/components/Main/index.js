import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'

const Main = props => (
  <div style={{height: '100%'}}>
    <Header/>
    {props.children}
  </div>
)

Main.propTypes = {
  children: PropTypes.object.isRequired
}

export default Main
