import PropTypes from 'prop-types'

const Layout = props => {
  return props.children
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
}

export default Layout
