import { Stack, Typography, type TypographyProps } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ReactNode } from "react";
import { useAppSelector } from "@/Core/Hooks";

const QuizRuleQuestionTypes = () => {
   const quizRules = useAppSelector((state) => state.QuizRules.quizRules);

   return (
      <Stack gap={1} >
         <Stack flexDirection="row" alignItems="center" gap={2}>
            <QuestionTypeIcon type={quizRules.multipleChoice} />
            <QuizRuleQuestionType error={!quizRules.multipleChoice}> Multiple Choice </QuizRuleQuestionType>
         </Stack>
         <Stack flexDirection="row" alignItems="center" gap={2}>
             <QuestionTypeIcon type={quizRules.trueFalse} />
            <QuizRuleQuestionType error={!quizRules.trueFalse}> True/False </QuizRuleQuestionType>
         </Stack>
         <Stack flexDirection="row" alignItems="center" gap={2}>
            <QuestionTypeIcon type={quizRules.shortAnswer} />
            <QuizRuleQuestionType error={!quizRules.shortAnswer}> Short Answer </QuizRuleQuestionType>
         </Stack>     
      </Stack>
   )
}

export default QuizRuleQuestionTypes;

type QuizRuleQuestionTypeProps = TypographyProps & { children: ReactNode, error?: boolean }

const QuizRuleQuestionType = ({ children, error=false }: QuizRuleQuestionTypeProps) => (
   <Typography 
      sx={{ color: (theme) => (error ? theme.palette.error.main : theme.palette.success.main) }} 
      alignSelf="stretch" 
      display="flex" 
      alignItems="center" 
      flex={1} 
      fontSize={18} 
      paragraph
   > 
      {children} 
   </Typography>
)

type QuestionTypeIconProps = { type: boolean; }

const QuestionTypeIcon = ({ type }: QuestionTypeIconProps) => {
   if (type) {
      return <CheckCircleIcon color="success" sx={{ width: 25, height: 25 }} />;
   }

   return <CancelIcon color="error" sx={{ width: 25, height: 25 }} />;
}