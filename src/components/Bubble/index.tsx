import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, TooltipProps } from 'recharts';

interface DataPoint {
  x: number;
  y: number;
  count: number;
  fillColor: string;
  label: string;
}

interface BubbleProps {
  data: DataPoint[];
}

const renderTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0] && payload[0].payload as DataPoint;
    const { label, fillColor, count } = data;
    if (count <= 0) {
      return null;
    }

    return (
      <div
        style={{
          backgroundColor: '#fff',
          margin: 0,
          padding: 10,
          borderRadius: 8,
          boxShadow: `${fillColor} 0px 0px 16px`
        }}
      >
        <p style={{ display: "inline", fontSize: 12 }}>{count} {label}</p>
      </div>
    );
  }

  return null;
};

const Bubble: React.FC<BubbleProps> = ({ data }) => {
  const domain = [0, 24];
  const range = [160, 2500];
  return (
    <ResponsiveContainer width={140} height={140}>
      <ScatterChart
        width={40}
        height={200}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      >
        <XAxis type="number" dataKey="x" name="x" hide />
        <YAxis type="number" dataKey="y" name="y" hide />
        <ZAxis type="number" dataKey="count" name='size' domain={domain} range={range} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} animationEasing="ease" allowEscapeViewBox={{ x: true, y: true }} />
        <Scatter name="Activities" data={data} fill="#8884d8">
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fillColor} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Bubble;