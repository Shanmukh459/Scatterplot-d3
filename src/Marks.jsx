export const Marks = ({ data, xScale,yScale, xValue, yValue }) => 
data.map(d => (
  <circle 
    cx={xScale(xValue(d))}
    cy={yScale(yValue(d))}
    r={5}
  ></circle>
))