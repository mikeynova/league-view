import React, { Component } from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'

class SortedChamps extends Component {
  // shouldComponentUpdate(props) {
  //   if (props.initialdata) {
  //     if (props.a.rows[0] === props.index || this.props.a.rows[0] === this.props.index) {
  //       return true
  //     }
  //     return false
  //   }
  //   return true
  // }

  render () {
    const { champ, a, index, ...otherProps } = this.props
    return (
      <TableRow {...otherProps} selected={a.rows.indexOf(index) !== -1}>
        <TableRowColumn style={{backgroundColor: '#E8E8E8', width: '50px'}}/>
        <TableRowColumn>{champ[0]}</TableRowColumn>
        <TableRowColumn>{champ[1]}</TableRowColumn>
        <TableRowColumn>{champ[2] * 100}</TableRowColumn>
      </TableRow>
    )
  }
}

export default SortedChamps
