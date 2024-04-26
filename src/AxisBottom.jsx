export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map((tickValue) => (
    <g transform={`translate(${xScale(tickValue)}, 0)`}>
      <line y2={innerHeight} stroke="black" />
      <text style={{ textAnchor: "middle" }} y={innerHeight + 3} dy="0.71em">
        {tickValue}
      </text>
    </g>
  ));
