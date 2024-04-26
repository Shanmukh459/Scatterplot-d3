export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
}) =>
  xScale.ticks().map((tickValue) => (
    <g className="tick" transform={`translate(${xScale(tickValue)}, 0)`} key={tickValue}>
      <line y2={innerHeight} />
      <text
        style={{ textAnchor: "middle" }}
        y={innerHeight + tickOffset}
        dy="0.71em"
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
