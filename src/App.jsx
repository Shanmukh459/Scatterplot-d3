import React, { useEffect, useState } from "react";
import { scaleLinear, extent, format, tickFormat } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const height = 720;
const width = 1080;

const margin = {
  top: 20,
  right: 30,
  bottom: 70,
  left: 100,
};

const xAxisLabelOffset = 55;
const yAxisLabelOffset = 35;

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.sepal_length;
  const xAxisLabel = "Sepal Length";

  const yValue = (d) => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  const siFormat = format("0.2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = scaleLinear().domain(extent(data, xValue)).range([0, innerWidth]).nice();

  const yScale = scaleLinear().domain(extent(data, yValue)).range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={10}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
        >
          {xAxisLabel}
        </text>

        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={10}/>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
}

export default App;
