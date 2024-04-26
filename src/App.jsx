import React, { useEffect, useState } from "react"
import { scaleLinear, extent } from "d3"
import { useData } from "./useData"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import { Marks } from "./Marks"

const height = 500
const width = 960

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 100
}

const xAxisLabelOffset = 25
const yAxisLabelOffset = 45

function App() {
  const data = useData()

  const xValue = (d) => d.sepal_length
  const xAxisLabel = 'Sepal Length'

  const yValue = (d) => d.sepal_width
  const yAxisLabel = 'Sepal Width'

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  if(!data) {
    return <pre>Loading...</pre>
  }

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, width])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, height])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <text 
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
        >{xAxisLabel}</text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text>{yAxisLabel}</text>
        <Marks data={data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} />
      </g>
    </svg>
  )
}

export default App
