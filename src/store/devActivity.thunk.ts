import store from "./store";
import { setActivityMetadata, setDevsActivityData, setAPIstatus } from './app.slice';
import { API_STATUS } from "../constants";

export function devActivityInit() {
  return async (dispatch: typeof store.dispatch) => {
    const url = `${import.meta.env.VITE_BE_API_URL}/api/devs-activity`

    const fetchData = async () => {
      try {
        await dispatch(setAPIstatus(API_STATUS.LOADING));
        const data = await fetch(url);
        const response = await data.json();
        await dispatch(setAPIstatus(API_STATUS.READY));
        return response.data
      } catch (err) {
        await dispatch(setAPIstatus(API_STATUS.ERROR));
        console.log("error fetching data")
        return {};
      }
    }
    const data = await fetchData();
    dispatch(setActivityMetadata(data?.AuthorWorklog?.activityMeta));
    dispatch(setDevsActivityData(data?.AuthorWorklog?.rows));
    return;
  }
}