import store from "./store";
import { setActivityMetadata, setDevsActivityData } from './app.slice';

export function devActivityInit() {
  return async (dispatch: typeof store.dispatch, getState: ReturnType<typeof store.getState>) => {
    const url = `${import.meta.env.VITE_BE_API_URL}/api/devs-activity`

    const fetchData = async () => {
      try {
        const data = await fetch(url);
        const response = await data.json();
        return response.data
        // dispatch(setActivityMetadata(response.AuthorWorklog.activityMeta));
        // dispatch(setDevsActivityData({ developersActivityData: response.AuthorWorklog.rows }));
        // return;
      } catch (err) {
        console.log("error fetching data")
        return {};
      }
    }
    /*
    * @param val - processed node
    */
    const data = await fetchData();
    console.log("data: ", data);
    dispatch(setActivityMetadata(data?.AuthorWorklog?.activityMeta));
    dispatch(setDevsActivityData(data?.AuthorWorklog?.rows));
    return;
  }
}