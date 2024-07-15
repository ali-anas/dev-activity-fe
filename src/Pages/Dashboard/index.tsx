import React from 'react';
import { useSelector } from 'react-redux';
import { getTableBubbleData } from '../../helpers';
import DevActivityBubbleTable, { ActivityMetaInfo } from '../../components/DevActivityBubbleTable';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { developersActivityData, activityMetadata } = useSelector((state: any) => state.app);
  
  const activityToInclude = activityMetadata.map((activity: any) => activity.label);

  const { allDevsBubbleData, dayArr, dateArr } = getTableBubbleData(developersActivityData, activityToInclude);

  return (
    <div className="activity-table-wrapper">
      <div className="activity-table-content">
        <ActivityMetaInfo activityToInclude={activityToInclude} />
        <DevActivityBubbleTable 
          allDevsBubbleData={allDevsBubbleData}
          dayArr={['', ...dayArr]}
          dateArr={[null, ...dateArr]}
          showDeveloperColumn
        />
      </div>
    </div>
  );
};

export default Dashboard;
