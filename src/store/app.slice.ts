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
}

const initialState: StateType = {
  activityMetadata: [],
  developersActivityData: {},
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
  },
});

export const { setActivityMetadata, setDevsActivityData } = appSlice.actions;

export default appSlice.reducer;
