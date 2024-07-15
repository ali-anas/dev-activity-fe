import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { parseQuery, calculateTotalHours } from '../../helpers';
import ContributorSummarCard from '../../components/ContributorSummaryCard';
import ContributorBurnoutCard from '../../components/ContributorBurnoutCard';
import ContributorDeploymentCard from '../../components/ContributorDeploymentCard';
import ContributorBugReportCard from '../../components/ContributorBugReportCard';
import ContributorActivityLogCard from '../../components/ContributorActivityLogCard/ContributorActivityLogCard';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { WorkingHoursData } from '../../constants';

const ContributorProfile: React.FC = () => {
  const location = useLocation();
  const { search } = location;
  const query = parseQuery(search);
  const developerName = query.name;

  if (!developerName) {
    return <h1>Developer does not exist!</h1>;
  }

  const { developersActivityData } = useSelector((state: any) => state.app);
  const contributorData = developersActivityData[developerName];
  const REQ_ACTIVITIES = ['PR Open', 'PR Merged', 'Commits', 'PR Reviewed'];

  

  const totalWhData = calculateTotalHours(WorkingHoursData);

  return (
    <>
      <Box px="6" pt="56px" mb="6">
        <Link to="/">
          <Text color="CaptionText" fontSize="small" display="flex" alignItems="center">
            <ArrowBackIcon mr="1" /> Go back to Home Page
          </Text>
        </Link>
        <ContributorSummarCard summaryData={contributorData.totalActivity} />
        <Flex gap="4" wrap="wrap">
          <ContributorBurnoutCard data={WorkingHoursData} totalWhData={totalWhData} />
          <ContributorDeploymentCard contributorData={contributorData} />
          <ContributorBugReportCard contributorData={contributorData} />
        </Flex>
        <ContributorActivityLogCard contributorData={{ [developerName]: contributorData }} activityToInclude={REQ_ACTIVITIES} />
      </Box>
    </>
  );
};

export default ContributorProfile;
