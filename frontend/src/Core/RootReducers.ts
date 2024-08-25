import AppConfigSlice from "./Store/AppConfig.slice";
import DashboardSlice from "@/Pages/Dashboard/Store/Dashboard.slice";
import QuizSlice from "@/Pages/Quiz/Store/Quiz.slice";
import CreatorSlice from "@/Pages/Creator/Store/Creator.slice";
import QuizRulesSlice from "@/Pages/QuizRules/Store/QuizRules.slice";
import QuizResultSlice from "@/Pages/QuizResult/Store/QuizResult.slice";

const reducer = {
  ...AppConfigSlice,
  ...DashboardSlice,
  ...QuizSlice,
  ...CreatorSlice,
  ...QuizRulesSlice,
  ...QuizResultSlice,
}

export default reducer;