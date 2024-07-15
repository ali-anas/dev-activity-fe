import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 }
];

// const data = [
//   { name: "Worked in office hours", value: },
//   { name: "Worked in non office hours", value: }
// ]

export default function PieChartComp(props) {

  const { data, dataKey, cx, cy, innerRadius, outerRaduis, fill, height, width } = props;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (renderProps) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
      fill,
    } = renderProps;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const x = cx + (outerRadius + 8) * cos;
    const y = cy + (outerRadius + 8) * sin;
    const ex = x + (cos >= 0 ? 1 : -1) * 22;
    const ey = y;
    return (
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor="middle">{`${(
        percent * 100
      ).toFixed(0)}%`}</text>
    );
  };
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        dataKey={dataKey}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRaduis}
        fill={fill}
        label={renderCustomizedLabel}
        labelLine={false}
        paddingAngle={1}
      >
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
    </PieChart>
  );
}