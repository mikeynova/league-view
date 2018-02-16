import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Routes from './routes'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Index = () => (
  <MuiThemeProvider>
    <Routes/>
  </MuiThemeProvider>
)

ReactDOM.render(<Index />, document.getElementById('root'))
registerServiceWorker()
injectTapEventPlugin()
