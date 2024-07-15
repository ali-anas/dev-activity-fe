import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activityMetadata: [],
  developersActivityData: {},
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActivityMetadata: (state, action) => {
      console.log("Setting activity metadata", action, action.payload);
      state.activityMetadata = action.payload;
    },

    setDevsActivityData: (state, action) => {
      const allDevsData = action.payload;
      const data = {};
      allDevsData.forEach((devData) => {
        data[devData.name] = devData;
      })

      state.developersActivityData = data;
  },
}});

export const { setActivityMetadata, setDevsActivityData } = appSlice.actions;

export default appSlice.reducer;
