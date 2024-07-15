import React from 'react';
import DevActivityBubbleTable, { ActivityMetaInfo } from '../DevActivityBubbleTable';
import { getTableBubbleData } from '../../helpers';
import { Card, Text } from '@chakra-ui/react';

const ContributorActivityLogCard = ( { contributorData, activityToInclude }) => {
  const { allDevsBubbleData, dayArr, dateArr } = getTableBubbleData(contributorData, activityToInclude);
  return (
    <div className="activity-table-wrapper">
      <Card variant="outline" p="6" borderWidth={2}>
        <Text fontWeight="bold" fontSize="2xl" justifyContent="start" display="flex" pb="2">Activity Log</Text>
        <ActivityMetaInfo activityToInclude={activityToInclude} />
        <DevActivityBubbleTable
          allDevsBubbleData={allDevsBubbleData}
          dayArr={dayArr}
          dateArr={dateArr}
        />
    </Card>
    </div>
  )
}

export default ContributorActivityLogCard