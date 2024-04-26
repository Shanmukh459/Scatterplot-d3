import React, { useEffect, useState } from "react"
import { csv, scaleLinear, extent, min, max } from "d3"


const csvUrl = "https://gist.githubusercontent.com/Shanmukh459/b5d83c8b7334616ceb7d9bfba7ffeb24/raw/c2a883e845ddae11c612c03823ee403e1f4d12ed/Iris.csv"

const height = 500
const width = 960

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 100
}

function App() {
  const [data, setData] = useState(null)

  const xValue = (d) => d.sepal_length
  const yValue = (d) => d.sepal_width

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  useEffect(() => {
    const row = (d) => {
      d.sepal_width = +d.sepal_width
      d.petal_width = +d.petal_width
      d.sepal_length = +d.sepal_length
      d.petal_length = +d.petal_length
      return d
    }
    csv(csvUrl, row).then(setData)
  }, [])

  if(!data) {
    return <pre>Loading...</pre>
  }

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, width])

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, height])

  console.log(data[0])

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
