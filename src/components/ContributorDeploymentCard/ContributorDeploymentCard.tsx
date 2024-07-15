import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { createPrData } from '../../helpers';
import { Box, Card, Text, Flex } from '@chakra-ui/react';
import { DayActivity } from '../../types';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

interface ContributorDeploymentCardProps {
  contributorData: {
    totalActivity: { name: string; value: number }[];
    dayWiseActivity: DayActivity[];
  }
}

const renderTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    const { name } = data;
    const prMerged = Number(data['PR Merged']) || 0;
    const prOpen = Number(data['PR Open']) || 0;
    const fillColor = 'rgba(0, 0, 0, 0.2)';

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
        <p style={{ display: "inline", fontSize: 12 }}>{prOpen} PR Open</p>
        <p style={{ display: "inline", fontSize: 12 }}>{prMerged} PR Merged</p>
      </div>
    );
  }

  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <Box display='flex' gap='10px' justifyContent="end">
      {payload.map((entry: any, index: number) => (
        <Box display='flex' alignItems='center' key={`item-${index}`}>
          <span className="working-hour-color-info" style={{ backgroundColor: entry.color }}></span>
          <Text color="GrayText" fontSize="smaller">{entry.value}</Text>
        </Box>
      ))}
    </Box>
  );
};

const ContributorDeploymentCard: React.FC<ContributorDeploymentCardProps> = ({ contributorData }) => {
  const { activityMetadata } = useSelector((state: any) => state.app);
  const { totalActivity, dayWiseActivity } = contributorData;

  const prOpenFillColor = activityMetadata.find((activity: any) => activity.label === 'PR Open')?.fillColor || '#8884d8';
  const prMergedFillColor = activityMetadata.find((activity: any) => activity.label === 'PR Merged')?.fillColor || '#82ca9d';

  const lastWeekData = contributorData.dayWiseActivity.slice(-7);
  const prBarChartData = createPrData(lastWeekData);

  const totalDeployment = totalActivity.find(activity => activity.name === 'PR Merged')?.value || 0;
  const period = dayWiseActivity.length / 7 || 1;
  const avgDeploymentFreq = (totalDeployment / period).toFixed(2);

  return (
    <Card variant="outline" borderWidth={2} width="fit-content" p="6" height="fit-content" flexGrow={1}>
      <Text fontSize='2xl' fontWeight='bold'>Deployment Frequency</Text>
      <Box display={{ base: 'none', md: 'block' }}>
        <BarChart
          width={550}
          height={300}
          data={prBarChartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid vertical={false} fillOpacity={0.6} strokeDasharray="8 8" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis stroke="#8884d8" axisLine={false} tickLine={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} animationEasing="ease" allowEscapeViewBox={{ x: true, y: true }} />
          <Legend iconType='circle' iconSize={12} content={renderLegend} />
          <Bar dataKey="PR Open" fill={prOpenFillColor} barSize={80} />
          <Bar dataKey="PR Merged" fill={prMergedFillColor} barSize={80} />
        </BarChart>
      </Box>
      <Flex alignItems="baseline" height="fit-content">
        <Text fontSize="6xl" fontWeight="bold">{avgDeploymentFreq}</Text>
        <Text fontSize="x-small" textTransform="uppercase" color="GrayText" ml="2">average deployment per week</Text>
      </Flex>
    </Card>
  );
};

export default ContributorDeploymentCard;
