import { Stack, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { CustomTooltip } from "@/Components/Tooltip";
import { useAppSelector } from "@/Core/Hooks";
import { formatTime } from "@/Core/Helper";

const QuizRuleInfos = () => {
   const quizRules = useAppSelector((state) => state.QuizRules.quizRules);

   const { minute, second } = formatTime(quizRules.totalTime);

   return (
      <Stack gap={1}>
         <QuizRuleInfo 
            keyValue="Number of Questions" 
            value={quizRules.numberOfQuestions}
            description={`There are ${quizRules.numberOfQuestions} questions in this quiz.`}
         />
         <QuizRuleInfo 
            keyValue="Question Time" 
            value="-"
            description="There is no different time limit for each question."
         />
         <QuizRuleInfo 
            keyValue="Total Time" 
            value={`${minute.name}:${second.name} min`} 
            description={`You have ${minute.name}:${second.name} minutes to complete this quiz.`}
         />
         <QuizRuleInfo 
            keyValue="Total Attempt" 
            value={quizRules.maxAttempt} 
            description={`You have ${quizRules.maxAttempt} attempt to complete this quiz.`}
         />
      </Stack>
   )
}

export default QuizRuleInfos;

type QuizRuleInfoProps = {
   keyValue: string;
   value: number | string;
   description: string;
};

const QuizRuleInfo = ({ keyValue, value, description }: QuizRuleInfoProps) => (
   <Stack flexDirection="row" alignItems="center" gap={2}>
      <CustomTooltip placement="top" arrow title={description}> 
         <InfoIcon color="primary" sx={{ cursor: "pointer" }} /> 
      </CustomTooltip>
      <Typography color="primary" lineHeight={1.5} fontWeight="bold" fontSize="1.1rem" variant="h6"> {keyValue}: </Typography>
      <Typography alignSelf="stretch" display="flex" alignItems="center" flex={1} fontSize={20} paragraph> {value} </Typography>
   </Stack>
);