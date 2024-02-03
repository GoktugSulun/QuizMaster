import AppConfig from "./Store/AppConfig.slice";
import Dashboard from "@/Pages/Dashboard/Store/Dashboard.slice";
import Quiz from "@/Pages/Quiz/Store/Quiz.slice";

const reducer = {
  ...AppConfig,
  ...Dashboard,
  ...Quiz,
}

export default reducer;