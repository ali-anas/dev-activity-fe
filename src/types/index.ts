export type DayActivity = {
  items: {
    children: { label: string, count: number, fillColor: string }[]
  };
  date: string;
};