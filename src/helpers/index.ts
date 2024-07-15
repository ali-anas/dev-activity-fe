export function parseQuery(queryString: string): { [key: string]: string } {
  const query: { [key: string]: string } = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  return query;
}

type WorkingHours = {
  name: string;
  wh: number;
  nwh: number;
  amt: number;
};

export function calculateTotalHours(data: WorkingHours[])  {
  const whData = data.reduce((totals, day) => {
    totals.totalWh += day.wh;
    totals.totalNwh += Math.abs(day.nwh);
    return totals;
  }, { totalWh: 0, totalNwh: 0 });

    return [
    { name: "Worked in office hours", value: whData.totalWh, fill: '#9046cf'},
    { name: "Worked in non office hours", value:whData.totalNwh, fill: '#ff8552' }
  ]
}

export function createPrData(data) {
  console.log('pr data: available: ', data);
  const newData = data?.map((dayActivity) => {
    const { items: { children }, date } = dayActivity;
    const temp = {};
    temp[children[0].label] = children[0].count;
    temp[children[1].label] = children[1].count;
    temp.name = formatDate(date);
    return temp;
  })
  return newData;
}

export function createBugReportData(data) {
  const newData = data?.map((dayActivity) => {
    const { items: { children }, date } = dayActivity;
    const temp = {};
    temp[children[5].label] = children[5].count;
    temp[children[6].label] = children[6].count;
    temp.name = formatDate(date);
    return temp;
  })
  return newData;
}

export function formatDate(inputDate: string, format: string): string | number {
  const dateObj = new Date(inputDate);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const dayOfMonth = dateObj.getDate();

  switch(format) {
    case 'day': {
      return dayOfWeek;
    }
    case 'date': {
      return dayOfMonth;
    }
    default: {
      return `${dayOfWeek}, ${dayOfMonth}`;
    }
  }
}

const coordinates = [{x: -0.1, y: 0}, {x: 0.1, y: 0}, {x: 0, y: 0.0} ,{x: 0, y: -0.1}, {x: 0.1, y: -0.1}, {x: 0, y: 0.1}, {x: 0.1, y: 0.1}]


export function getTableBubbleData(developersActivityData: any, getDataFor = []): { dateArr: number[], dayArr: string[], allDevsBubbleData: any } {
  let dateArr: number[] = [];
  let dayArr: string[] = [];
  let allDevsBubbleData: any[] = [];
  Object.values(developersActivityData)?.map((devData, index) => {
    const { dayWiseActivity, name } = devData;
    const lastWeekData =  dayWiseActivity.slice(-7);
    const fullDateArray = lastWeekData.map((day) => day.date);

    dateArr = fullDateArray.map((date: string) => formatDate(date, 'date'));
    dayArr = fullDateArray.map((date: string) => formatDate(date, 'day'));
    const bubbleData = lastWeekData.map((dateData) => {
      const { items: { children: activityData }} = dateData;
      return activityData.map((activity, idx: number) => ({
          ...activity,
          ...coordinates[idx],
      })).map((activity) => ({
          ...activity,
          fillColor: Number(activity.count) > 0 ? activity.fillColor : 'transparent'
        })).filter((activity) => getDataFor.includes(activity.label));
    })
    allDevsBubbleData.push({
      devName: name,
      bubbleData,
    })
  })
  return { dateArr, dayArr, allDevsBubbleData };
};