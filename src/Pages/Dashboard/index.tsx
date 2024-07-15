import React from 'react';
import { useSelector } from 'react-redux';
import { getTableBubbleData } from '../../helpers';
import DevActivityBubbleTable, { ActivityMetaInfo } from '../../components/DevActivityBubbleTable';
import './Dashboard.css';
import { API_STATUS } from '../../constants';
import Loader from '../../components/Loader';

const Dashboard: React.FC = () => {
  const { developersActivityData, activityMetadata, apiStatus } = useSelector((state: any) => state.app);
  
  const activityToInclude = activityMetadata.map((activity: any) => activity.label);

  const { allDevsBubbleData, dayArr, dateArr } = getTableBubbleData(developersActivityData, activityToInclude);

  return apiStatus === API_STATUS.LOADING ? <Loader />: (
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
