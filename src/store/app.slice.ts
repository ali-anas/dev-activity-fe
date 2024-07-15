import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ActivityMetadata {
  label: string;
  fillColor: string;
  // Add more properties as needed
}

interface DeveloperActivityData {
  [key: string]: any; // Adjust this type as per your actual data structure
}

interface StateType {
  activityMetadata: ActivityMetadata[];
  developersActivityData: DeveloperActivityData;
  apiStatus: null | string;
}

const initialState: StateType = {
  activityMetadata: [],
  developersActivityData: {},
  apiStatus: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActivityMetadata: (state, action: PayloadAction<ActivityMetadata[]>) => {
      state.activityMetadata = action.payload;
    },
    setDevsActivityData: (state, action: PayloadAction<any[]>) => {
      const allDevsData = action.payload;
      const data: DeveloperActivityData = {};
      allDevsData.forEach((devData) => {
        data[devData.name] = devData;
      });
      state.developersActivityData = data;
    },
    setAPIstatus: (state, action: PayloadAction<null|string>) => {
      const status = action.payload;
      state.apiStatus = status;
    }
  },
});

export const { setActivityMetadata, setDevsActivityData, setAPIstatus } = appSlice.actions;

export default appSlice.reducer;
