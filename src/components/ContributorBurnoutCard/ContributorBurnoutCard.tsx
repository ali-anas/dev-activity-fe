import React from 'react';
import { Box, Card, Divider, Flex, Text } from '@chakra-ui/react';
import { Bar, BarChart, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';
import PieChartComp from '../Chart/PieChart';
import './ContributorBurnoutCard.css';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

interface ContributorBurnoutCardProps {
  data: { name: string; wh: number; nwh: number; amt: number; }[];
  totalWhData: { name: string; value: number; fill: string; }[];
}

const renderTooltip = (props: TooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    const whFillColor = payload[0]?.color;
    const nonWhFillColor = payload[1]?.color;
    const { nwh, wh, name } = data;
    const nonWh = Math.abs(nwh);
    const total = nonWh + wh;
    let fillColor = 'rgba(0, 0, 0, 0.2)';
    if (total > 0) {
      fillColor = wh > nonWh ? whFillColor : nonWhFillColor;
    }

    return (
      <div
        style={{
          backgroundColor: '#fff',
          margin: 0,
          padding: 10,
          borderRadius: 8,
          boxShadow: `${fillColor} 0px 0px 16px`,
          display: 'flex',
          flexDirection: 'column',
          letterSpacing: '1px'
        }}
      >
        <p style={{ display: "inline", fontSize: 12 }}>{name}</p>
        <p style={{ display: "inline", fontSize: 12 }}>Office Hours: {wh}</p>
        <p style={{ display: "inline", fontSize: 12 }}>Non-Office Hours: {nonWh}</p>
        <p style={{ display: "inline", fontSize: 12 }}>Total: {total} hours</p>
      </div>
    );
  }

  return null;
};

const ContributorBurnoutCard: React.FC<ContributorBurnoutCardProps> = ({ data, totalWhData }) => {
  let totalHoursWorked = 0;
  data.forEach((entry) => {
    totalHoursWorked += Math.abs(entry.amt);
  });
  const workingHoursPerDay = 9;
  const avgWorkingHours = (totalHoursWorked / 5).toFixed(2);
  const extraHoursWorked = totalHoursWorked - (workingHoursPerDay * 5);
  
  return (
    <Card variant="outline" borderWidth="2px" p='6' width={{ base: '100%', md: 'fit-content' }} flexGrow={1}>
      <Text fontSize='2xl' fontWeight='bold'>Burnout Risk</Text>
      <div className="working-hour-box">
        <Flex direction="column" alignItems='center' justifyContent="center">
          <Box display={{ base: 'none', md: 'block' }}>
            <BarChart
              width={300}
              height={200}
              data={data}
              stackOffset="sign"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" axisLine={false} tickLine={false} orientation="top" />
              <YAxis hide />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} animationEasing="ease" allowEscapeViewBox={{ x: true, y: true }} />
              <ReferenceLine y={0} stroke="#f1f3f4" />
              <Bar dataKey="wh" fill="#9046cf" stackId="stack" barSize='20' />
              <Bar dataKey="nwh" fill="#ff8552" stackId="stack" barSize='20' />
            </BarChart>
          </Box>
          <Box display='flex' gap='10px'>
            <Box display='flex' alignItems='center'>
              <span className="working-hour-color-info" style={{ backgroundColor: '#9046cf' }} />
              <Text fontSize="smaller" color="GrayText">Working in office hours</Text>
            </Box>
            <Box display='flex' alignItems='center'>
              <span className="working-hour-color-info" style={{ backgroundColor: '#ff8552' }} />
              <Text fontSize="smaller" color="GrayText">Working in non-office hours</Text>
            </Box>
          </Box>
        </Flex>
        <Divider display={{ base: 'block', md: 'none' }} />
        <Flex pt="2" flex={1} flexDirection="column" justifyContent={{ base: "center", md: 'flex-start' }} alignItems={{ base: "center", md: 'flex-start' }}>
          <Text color='GrayText' pb='2'>Average Working Hours</Text>
          <Text fontSize='2xl' fontWeight='bold'>{avgWorkingHours}</Text>
          <Divider />
          <PieChartComp 
            data={totalWhData}
            dataKey="value"
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            height={200}
            width={200}
            fill="#82ca9d"
          />
        </Flex>
      </div>
      {extraHoursWorked > 0 ? (
        <Flex alignItems="baseline" height="fit-content">
          <Text fontSize="6xl" fontWeight="bold">{extraHoursWorked}</Text>
          <Text fontSize="x-small" textTransform="uppercase" color="GrayText" ml="2">hours of extra effort this week</Text>
        </Flex>
      ) : null}
    </Card>
  );
}

export default ContributorBurnoutCard;
