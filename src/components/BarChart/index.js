import React, { Component } from 'react'
import * as d3 from 'd3'
import './BarChart.css'

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    const data = this.props.selected.data
    this.buildBarChart(data)
  }

  shouldComponentUpdate(props) {
    if (props.selected.data.length !== this.props.selected.data.length) {
      this.buildBarChart(props.selected.data, true)
      return true
    }
    return false
  }

  buildBarChart = (data, update) => {
    var svg = d3.select(".chart"),
      margin = {top: 0, right: 20, bottom: 30, left: 180},
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom;

    if (update) {
      svg.selectAll(".bar")
        .remove()
        .exit()
        .data(data)
      svg.selectAll("g")
        .remove()
        .exit()
    }

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain([0, d3.max(data, function(d) {
        return d.value
    })]);
    y.domain(data.map(function(d) { return d.name; })).padding(0.1);
    

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) {
            return d
        }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return x(d.value); })
      .text(function(d) { return d.value; });
  }
  render() {
    return (
      <svg width="700" height="500" className="chart"></svg>
    )
  }
}

export default BarChart
