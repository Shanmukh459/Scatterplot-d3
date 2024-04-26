import React, { useEffect, useState } from "react"
import { csv, scaleLinear, extent, min, max } from "d3"


const csvUrl = "https://gist.githubusercontent.com/Shanmukh459/b5d83c8b7334616ceb7d9bfba7ffeb24/raw/c2a883e845ddae11c612c03823ee403e1f4d12ed/Iris.csv"

const height = 920
const width = 1080

function App() {
  const [data, setData] = useState(null)

  const xValue = (d) => d.sepal_length
  const yValue = (d) => d.sepal_width

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
      {
        data.map(d => (
          <circle 
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={5}
          ></circle>
        ))
      }
    </svg>
  )
}

export default App
