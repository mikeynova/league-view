import React from 'react'
// import { BarChart, d3 } from 'react-d3-components'
import BarChart from '../BarChart'
import Slider from 'material-ui/Slider';
import './Modal.css'
import Dialog from 'material-ui/Dialog'

const ChampModal = ({ selected, modal, open, handleClose, champ, handleSliderChange, sliderValue }) => {
// console.log('selected.data', selected.data)
  return (
    <Dialog
      title={selected.name}
      // titleStyle={{paddingTop: '0', paddingBottom: '0' }}
      modal={modal}
      open={open}
      onRequestClose={handleClose}
      // contentStyle={{maxWidth: 'none'}}
    >
      <Slider
        min={0}
        sliderStyle={{marginTop: '10px', marginBottom: '0'}}
        max={selected.max}
        step={1}
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <BarChart selected={selected}/>
    </Dialog>
  )
}

export default ChampModal
