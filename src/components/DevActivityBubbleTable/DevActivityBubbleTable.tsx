import React from 'react';
import { useSelector } from 'react-redux';
import Bubble from '../Bubble';
import { Link } from 'react-router-dom';
import './DevActivityBubbleTable.css';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface ActivityMetaInfoProps {
  activityToInclude: string[];
}

interface ActivityMetadata {
  label: string;
  fillColor: string;
}

interface AppState {
  app: {
    activityMetadata: ActivityMetadata[];
  };
}

export const ActivityMetaInfo: React.FC<ActivityMetaInfoProps> = ({ activityToInclude }) => {
  const { activityMetadata = [] } = useSelector((state: AppState) => state.app) || {};
  return (
    <div className="meta-info-wrapper">
      {activityMetadata?.map((metaItem) => {
        const { label, fillColor } = metaItem;
        if (!activityToInclude.includes(label)) {
          return null;
        }
        return (
          <div key={label} className="meta-info-item">
            <span className="meta-info-item-color" style={{ backgroundColor: fillColor }} />
            {label}
          </div>
        );
      })}
    </div>
  );
};

interface DevActivityBubbleTableProps {
  allDevsBubbleData: {
    devName: string;
    bubbleData: any[];
  }[];
  dayArr: string[];
  dateArr: (number | null)[];
  showDeveloperColumn?: boolean;
}

const DevActivityBubbleTable: React.FC<DevActivityBubbleTableProps> = ({ allDevsBubbleData, dayArr, dateArr, showDeveloperColumn = false }) => {
  return (
    <div className="chart-container">
      <table>
        <thead>
          <tr>
            {dateArr.map((_, idx) => (
              <th key={idx}>
                <span className="date">{dateArr[idx]}</span>
                {dayArr[idx]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allDevsBubbleData?.map((devData, index) => {
            const { devName, bubbleData } = devData;
            return (
              <tr key={index}>
                {showDeveloperColumn ? (
                  <td>
                    <Link to={`/contributor?name=${devName}`}>
                      {devName}
                      <ExternalLinkIcon ml="2" />
                    </Link>
                  </td>
                ) : null}
                {bubbleData.map((dataForTheDay, idx) => (
                  <td key={`${dateArr[idx]}-${dayArr[idx]}-${devName}`}>
                    <Bubble data={dataForTheDay} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DevActivityBubbleTable;
