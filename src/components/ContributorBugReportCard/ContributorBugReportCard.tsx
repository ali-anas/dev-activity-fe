import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Text, Box, Flex } from '@chakra-ui/react';
import { createBugReportData } from '../../helpers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RootState } from '../../store/store';

interface ContributorBugReportCardProps {
  contributorData: {
    totalActivity: { name: string; value: number }[];
    dayWiseActivity: any[];
  };
}

const renderTooltip = (props: any) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    const incidentAlerts = Number(data['Incident Alerts']);
    const incidentResolved = Number(data['Incidents Resolved']);
    const { name } = data;
    const defaultFillColor = 'rgba(0, 0, 0, 0.2)';
    const fillColor = payload[0]?.stroke ?? defaultFillColor;

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
        <p style={{ display: "inline", fontSize: 12 }}>{incidentAlerts} Incident Alerts</p>
        <p style={{ display: "inline", fontSize: 12 }}>{incidentResolved} Incidents Resolved</p>
      </div>
    );
  }

  return null;
};

const ContributorBugReportCard: React.FC<ContributorBugReportCardProps> = ({ contributorData }) => {
  const { activityMetadata } = useSelector((state: RootState) => state.app);
  const { totalActivity, dayWiseActivity } = contributorData;
  const lastWeekData = dayWiseActivity?.slice(-7);
  const bugReportData = createBugReportData(lastWeekData);
  const incidentResFillColor = activityMetadata.find(activity => activity.label === 'Incidents Resolved')?.fillColor || '#8884d8';
  const totalIncidents = totalActivity.find(activity => activity.name === 'Incident Alerts')?.value || 0;
  const period = (dayWiseActivity.length / 7) || 1;
  const avgIncidentReported = (totalIncidents / period).toFixed(2);

  return (
    <Card p="6" variant="outline" borderWidth={2} height="fit-content" flexGrow={1}>
      <Text fontSize="2xl" fontWeight="bold" mb="2">Bug Report</Text>
      <Box display={{ base: 'none', md: 'block'}}>
        <LineChart
          width={500}
          height={300}
          data={bugReportData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} fillOpacity={0.6}/>
          <XAxis dataKey="name" hide />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} animationEasing="ease" allowEscapeViewBox={{ x: true, y: true }} />
          <Legend />
          <Line type="linear" dataKey="Incidents Resolved" stroke={incidentResFillColor} strokeWidth={2} />
        </LineChart>
      </Box>
      <Flex alignItems="baseline" height="fit-content">
        <Text fontSize="6xl" fontWeight="bold">{avgIncidentReported}</Text>
        <Text fontSize="x-small" textTransform="uppercase" color="GrayText" ml="2">average incident alerts per week</Text>
      </Flex>
    </Card>
  )
}

export default ContributorBugReportCard;
