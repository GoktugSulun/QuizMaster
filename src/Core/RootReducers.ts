import DashboardSlice from "@/Pages/Dashboard/Store/Dashboard.slice";
import AppConfigSlice from "./Store/AppConfig.slice";

const reducer = {
  ...DashboardSlice,
  ...AppConfigSlice
}

export default reducer;