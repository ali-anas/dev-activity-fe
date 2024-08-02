import { DayActivity } from "../types";

type WorkingHours = {
  name: string;
  wh: number;
  nwh: number;
  amt: number;
};

export function calculateTotalHours(data: WorkingHours[]) {
  const whData = data.reduce((totals, day) => {
    totals.totalWh += day.wh;
    totals.totalNwh += Math.abs(day.nwh);
    return totals;
  }, { totalWh: 0, totalNwh: 0 });

  return [
    { name: "Worked in office hours", value: whData.totalWh, fill: '#9046cf' },
    { name: "Worked in non office hours", value: whData.totalNwh, fill: '#ff8552' }
  ];
}

export function createPrData(data: DayActivity[]) {
  return data?.map(dayActivity => {
    const { items: { children }, date } = dayActivity;
    return {
      [children[0].label]: children[0].count,
      [children[1].label]: children[1].count,
      name: formatDate(date, 'full')
    };
  });
}

export function createBugReportData(data: DayActivity[]) {
  return data?.map(dayActivity => {
    const { items: { children }, date } = dayActivity;
    return {
      [children[5].label]: children[5].count,
      [children[6].label]: children[6].count,
      name: formatDate(date, 'full')
    };
  });
}

export function formatDate(inputDate: string, format: 'day' | 'date' | 'full'): string | number {
  const dateObj = new Date(inputDate);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const dayOfMonth = dateObj.getDate();

  switch (format) {
    case 'day':
      return dayOfWeek;
    case 'date':
      return dayOfMonth;
    default:
      return `${dayOfWeek}, ${dayOfMonth}`;
  }
}

const coordinates = [
  { x: -0.1, y: 0 }, { x: 0.1, y: 0 }, { x: 0, y: 0.0 },
  { x: 0, y: -0.1 }, { x: 0.1, y: -0.1 }, { x: 0, y: 0.1 }, { x: 0.1, y: 0.1 }
];

type DeveloperActivity = {
  dayWiseActivity: DayActivity[];
  name: string;
};

type BubbleData = {
  label: string;
  count: number;
  fillColor: string;
  x: number;
  y: number;
};

type BubbleDataResult = {
  dateArr: number[];
  dayArr: string[];
  allDevsBubbleData: { devName: string, bubbleData: BubbleData[][] }[];
};

export function getTableBubbleData(developersActivityData: DeveloperActivity[], getDataFor: string[] = []): BubbleDataResult {
  let dateArr: number[] = [];
  let dayArr: string[] = [];
  let allDevsBubbleData: { devName: string, bubbleData: BubbleData[][] }[] = [];

  Object.values(developersActivityData).forEach(devData => {
    const { dayWiseActivity, name } = devData;
    const lastWeekData = dayWiseActivity.slice(-7);
    const fullDateArray = lastWeekData.map(day => day.date);

    dateArr = fullDateArray.map(date => formatDate(date, 'date') as number);
    dayArr = fullDateArray.map(date => formatDate(date, 'day') as string);

    const bubbleData = lastWeekData.map(dateData => {
      const { items: { children: activityData } } = dateData;
      return activityData.map((activity, idx) => ({
        ...activity,
        ...coordinates[idx],
        fillColor: Number(activity.count) > 0 ? activity.fillColor : 'transparent'
      })).filter(activity => getDataFor.includes(activity.label));
    });

    allDevsBubbleData.push({
      devName: name,
      bubbleData,
    });
  });

  return { dateArr, dayArr, allDevsBubbleData };
}
