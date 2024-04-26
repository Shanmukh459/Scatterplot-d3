export const AxisLeft = ({ yScale, innerWidth}) => 
yScale.ticks().map(tickValue => (
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
))