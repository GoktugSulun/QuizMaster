import AppConfigSlice from "./Store/AppConfig.slice";
import DashboardSlice from "@/Pages/Dashboard/Store/Dashboard.slice";
import QuizSlice from "@/Pages/Quiz/Store/Quiz.slice";
import CreatorSlice from "@/Pages/Creator/Store/Creator.slice";

const reducer = {
  ...AppConfigSlice,
  ...DashboardSlice,
  ...QuizSlice,
  ...CreatorSlice,
}

export default reducer;