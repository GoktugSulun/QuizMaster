import { CustomTooltip } from "@/Components/Tooltip"
import { TooltipTypes } from "../Types/DashboardTypes";
import * as S from '../Style/Dashboard.style';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useNavigate } from "react-router-dom";
import { RouteEnums } from "@/Constants/Enums";

type CompletedQuizButtonsProps = {
   id: string;
   tooltipState: [TooltipTypes, React.Dispatch<React.SetStateAction<TooltipTypes>>];
}

const CompletedQuizButtons = (props: CompletedQuizButtonsProps) => {
   const navigate = useNavigate();
   const [tooltip, setTooltip] = props.tooltipState;

   const navigateToResultPage = () => {
      navigate({ pathname: RouteEnums.QUIZ_RESULTS, search: `?quizId=${props.id}` });
   }

   return (
      <CustomTooltip 
         arrow 
         placement="top" 
         open={tooltip.result} 
         onOpen={() => setTooltip((prev) => ({ ...prev, result: true }))}
         onClose={() => setTooltip((prev) => ({ ...prev, result: false }))}
         title={"Show Prev Results"}
      >
         <S.ResultButton 
            onClick={navigateToResultPage}
            sx={{ filter: "drop-shadow(4px 2px 6px #999)" }}
         >
            <QuestionAnswerIcon />
         </S.ResultButton>
      </CustomTooltip>
   )
}

export default CompletedQuizButtons