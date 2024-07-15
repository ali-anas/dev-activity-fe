import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { parseQuery, calculateTotalHours } from '../../helpers';
import ContributorSummarCard from '../../components/ContributorSummaryCard';
import ContributorBurnoutCard from '../../components/ContributorBurnoutCard';
import ContributorDeploymentCard from '../../components/ContributorDeploymentCard';
import ContributorBugReportCard from '../../components/ContributorBugReportCard';
import ContributorActivityLogCard from '../../components/ContributorActivityLogCard/ContributorActivityLogCard';
import { Box, Flex, Icon, Text, } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ContributorProfile = () => {
  const location = useLocation();
  const { search } = location;
  const query = parseQuery(search);
  const developerName = query.name;
  if(!developerName) {
    return <h1>Developer does exist!</h1>
  }
  
  const { developersActivityData, activityMetadata } = useSelector(state => state.app);
  const contributorData = developersActivityData[developerName];
  const REQ_ACTIVITIES = ['PR Open', 'PR Merged', 'Commits', 'PR Reviewed'];

  const workingHoursData = [
    {
      name: 'Mon',
      wh: 5,
      nwh: -5,
      amt: 10,
    },
    {
      name: 'Tue',
      wh: 9,
      nwh: -1,
      amt: 10,
    },
    {
      name: 'Wed',
      wh: 10,
      nwh: 0,
      amt: 10,
    },
    {
      name: 'Thu',
      wh: 3,
      nwh: -7,
      amt: 10,
    },
    {
      name: 'Fri',
      wh: 5,
      nwh: -5,
      amt: 10,
    },
    {
      name: 'Sat',
      wh: 0,
      nwh: 0,
      amt: 0,
    },
    {
      name: 'Sun',
      wh: 0,
      nwh: 0,
      amt: 0,
    },
  ];

  const totalWhData = calculateTotalHours(workingHoursData);
  return (
    <>
      <Box px="6" pt="56px" mb="6">
        <Link to="/"><Text color="CaptionText" fontSize="small" display="flex" alignItems="center"><ArrowBackIcon mr="1" /> Go back to Home Page</Text></Link>
        <ContributorSummarCard summaryData={contributorData.totalActivity} name={contributorData.name} />
        <Flex gap="4" wrap="wrap">
          <ContributorBurnoutCard data={workingHoursData} activeDays={contributorData.activeDays} totalWhData={totalWhData} />
          <ContributorDeploymentCard contributorData={contributorData} />
          <ContributorBugReportCard contributorData={contributorData} />
        </Flex>
        <ContributorActivityLogCard contributorData={{ [developerName]: contributorData}} activityToInclude={REQ_ACTIVITIES}/>
      </Box>
    </>
    
  )
}

export default ContributorProfile