import React from "react";
import { PieChart, Pie, Cell, PieLabelRenderProps } from "recharts";

interface DataPoint {
  name: string;
  value: number;
  fill: string;
}

interface PieChartCompProps {
  data: DataPoint[];
  dataKey: string;
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  fill: string;
  height: number;
  width: number;
}

const PieChartComp: React.FC<PieChartCompProps> = (props) => {
  const {
    data,
    dataKey,
    cx,
    cy,
    innerRadius,
    outerRadius,
    fill,
    height,
    width
  } = props;

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = (renderProps: PieLabelRenderProps) => {
    const {
      cx,
      cy,
      midAngle,
      outerRadius,
      percent,
    } = renderProps;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    // @ts-ignore
    const x = cx! + (outerRadius! + 8) * cos;
    // @ts-ignore
    const y = cy! + (outerRadius! + 8) * sin;
    const ex = x + (cos >= 0 ? 1 : -1) * 22;
    const ey = y;
    return (
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor="middle">{`${(
        percent! * 100
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
        outerRadius={outerRadius}
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
};

export default PieChartComp;
