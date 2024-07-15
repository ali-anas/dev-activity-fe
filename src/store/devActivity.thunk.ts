import store from "./store";
import { setActivityMetadata, setDevsActivityData } from './app.slice';

export function devActivityInit() {
  return async (dispatch: typeof store.dispatch) => {
    const url = `${import.meta.env.VITE_BE_API_URL}/api/devs-activity`

    const fetchData = async () => {
      try {
        const data = await fetch(url);
        const response = await data.json();
        return response.data
      } catch (err) {
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