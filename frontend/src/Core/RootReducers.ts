import AppConfig from "./Store/AppConfig.slice";
import Dashboard from "@/Pages/Dashboard/Store/Dashboard.slice";
import Quiz from "@/Pages/Quiz/Store/Quiz.slice";
import Creator from "@/Pages/Creator/Store/Creator.slice";

const reducer = {
  ...AppConfig,
  ...Dashboard,
  ...Quiz,
  ...Creator,
}

export default reducer;