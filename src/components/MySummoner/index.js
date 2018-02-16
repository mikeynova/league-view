import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import { Card } from 'material-ui/Card'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table'
import SortedChamps from '../SortedChamps'
import ChampModal from '../ChampModal'

class MySummoner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      order: false,
      open: false,
      schema: [],
      selected: {
        name: 'none',
        data: {},
        rows: []
      },
      sorted: [],
      currentData: 'sum',
      sliderValue: 0,
      selectedMarkers: []
    }
  }
  componentWillMount() {
    const sorted = []
    axios.get('http://localhost:5000/champs').then(res => {
      Object.keys(res.data.champs).map((key, i) => (
        sorted.push([key,
          res.data.champs[key].sum.games,
          res.data.champs[key].avg.win])
        // Object.key(res.data.champs[key].sum).map(stat => (
        //   // find top two
        // ))
        // Object.key(res.data.champs[key].avg).map(stat => (
        //   // find top two
        // ))
      ))
      this.setState({ champs: res.data.champs, sorted, schema: res.data.schema })
    })
  }

  handleChange = (e, index, value) => {
    const { champs } = this.state
    const sorted = []
    this.setState({value}, () => {
      for (var champ in champs) {
        for (var stat in champs[champ][this.state.currentData]) {
          if (stat === this.state.schema[value]) {
            sorted.push([champ, champs[champ][this.state.currentData][stat], champs[champ].avg.win])
          }
        }
      }
      sorted.sort((a,b) => b[1] - a[1])
      this.setState({ sorted, loaded: undefined })
    })
  }

  handleClick = () => {
    let sorted = this.state.sorted
    if (this.state.order) {
      sorted = sorted.sort((a,b) => a[2] - b[2])
    } else {
      sorted = sorted.sort((a,b) => b[2] - a[2])
    }
    this.setState({ sorted, order: !this.state.order, loaded: undefined })
  }

  handleSelection = (e) => {
    if (e.length && !this.state.open) {
      const champ =  this.state.champs[this.state.sorted[e][0]][this.state.currentData]
      let result = []
      let max = 0
      const average = async () => {
        await Object.keys(champ).map(key => {
          if (champ[key] > max) {
            max = champ[key]
          }
          return result.push({ name: key, value: champ[key] })
        })
        return result.sort((a,b) => a.value - b.value)
      }
      average().then(() => {
        this.setState({
          open: true,
          selected: { name: this.state.sorted[e][0], rows: e, masterData: result, data: result, max },
          loaded: 'true',
          sliderValue: max
        })
      }).then(() => {
          let dataLength = this.state.selected.data.length
          let marker = this.state.selected.max / this.state.selected.data.length
          let nextMarker = marker

          const markers = [marker]
          for (let i = 0; i < dataLength - 1; i++) {
            nextMarker += marker
            markers.push(nextMarker)
          }
          this.setState({ markers })
      })
    }
  }

  handleSliderChange = (event, value) => {
    const result = []
    const all = this.state.markers.filter(marker => value < marker)
    let loopLength = this.state.schema.length - all.length
    if (this.state.currentData === 'avg') {
      loopLength = this.state.schema.length - all.length - 1
    }
    for (let i = 0; i < loopLength; i++) {
      result.push({ name: this.state.selected.masterData[i].name, value: this.state.selected.masterData[i].value })
    }
    this.setState({
      selected: { ...this.state.selected, data: result},
    })
  }

  handleClose = () => {
    this.setState({ open: false, sliderValue: 0, selected: { name: 'none', rows: [], data: {} } })
  }

  handleChampData = () => {
    const { champs, value, currentData, schema } = this.state
    const sorted = []
    if (currentData === 'sum') {
      for (var champ in champs) {
        for (var stat in champs[champ].avg) {
          if (stat === schema[value]) {
            sorted.push([champ, champs[champ].avg[stat], champs[champ].avg.win])
          }
        }
      }
      sorted.sort((a,b) => b[1] - a[1])
      return this.setState({ sorted, currentData: 'avg' }, () => console.log(this.state))
    } else {
      for (var champ in champs) {
        for (var stat in champs[champ].sum) {
          if (stat === schema[value]) {
            sorted.push([champ, champs[champ].sum[stat], champs[champ].avg.win])
          }
        }
      }
      sorted.sort((a,b) => b[1] - a[1])
      return this.setState({ sorted, currentData: 'sum' }, () => console.log(this.state))
    }
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
        <ChampModal selected={this.state.selected} modal={false} open={this.state.open} handleClose={this.handleClose} champs={this.state.champs} handleSliderChange={this.handleSliderChange} sliderValue={this.state.sliderValue}/>
        <Card style={{width: '80%'}}>
          <Table fixedHeader={true} onRowSelection={this.handleSelection} height={'80vh'}>
            <TableHeader>
              <Header value={this.state.value} handleClick={this.handleClick} handleChange={this.handleChange} schema={this.state.schema} handleChampData={this.handleChampData} currentData={this.state.currentData}/>
            </TableHeader>
            <TableBody showRowHover={true} deselectOnClickaway={false}>
              {this.state.sorted.map((champ, i) => (
                <SortedChamps key={i} champ={champ} a={this.state.selected} index={i} initialdata={this.state.loaded}/>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }
}

const Header = ({ value, handleChange, schema, handleClick, handleChampData, currentData }) => {
  const items = []
    for (let i = 0; i < schema.length; i++) {
      const text = schema[i] === 'win' ? 'wins' : schema[i]
      items.push(
        <MenuItem
          value={i}
          key={i}
          primaryText={text.replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())}
        />
      )
  }
  return (
    <TableRow>
      <TableHeaderColumn style={{width: '50px'}}>
        <Toggle
          label={currentData}
          labelStyle={{ color: 'rgb(158, 158, 158)' }}
          onToggle={handleChampData}
        />
      </TableHeaderColumn>

      <TableHeaderColumn>Name</TableHeaderColumn>
      <TableHeaderColumn style={{paddingLeft: '0px'}}>
        <DropDownMenu maxHeight={300} value={value} onChange={handleChange}>
          {items}
        </DropDownMenu>
      </TableHeaderColumn>
      <TableHeaderColumn>
        <Toggle
          label="Win percentage"
          labelStyle={{ color: 'rgb(158, 158, 158)' }}
          onToggle={handleClick}
        />
      </TableHeaderColumn>
    </TableRow>
  )
}

export default MySummoner
