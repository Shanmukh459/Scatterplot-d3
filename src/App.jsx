import React, { useEffect, useState } from "react"
import { scaleLinear, extent } from "d3"
import { useData } from "./useData"

const height = 500
const width = 960

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 100
}

function App() {
  const data = useData()
  
  const xValue = (d) => d.sepal_length
  const yValue = (d) => d.sepal_width

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
        {xScale.ticks().map(tickValue => (
          <g transform={`translate(${xScale(tickValue)}, 0)`}>
            <line 
              y2={innerHeight}
              stroke="black"
            />
            <text 
              style={{textAnchor: 'middle'}} 
              y={innerHeight+3}
              dy='0.71em'
            >{tickValue}</text>
          </g>
        ))}
        {yScale.ticks().map(tickValue => (
          <g transform={`translate(0, ${yScale(tickValue)})`}>
            <line 
              x2={innerWidth}
              stroke="black"
            />
            <text 
              style={{textAnchor: 'middle'}} 
              x={-3}
              dy='0.32em'
            >{tickValue}</text>
          </g>
        ))}
        {
          data.map(d => (
            <circle 
              cx={xScale(xValue(d))}
              cy={yScale(yValue(d))}
              r={5}
            ></circle>
          ))
        }
      </g>
    </svg>
  )
}

export default App
