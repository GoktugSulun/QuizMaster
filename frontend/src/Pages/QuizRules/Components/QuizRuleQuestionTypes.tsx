import { Stack, Typography, type TypographyProps } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ReactNode } from "react";

const QuizRuleQuestionTypes = () => {
   return (
      <Stack gap={1} >
         <Stack flexDirection="row" alignItems="center" gap={2}>
            <CheckCircleIcon color="success" sx={{ width: 25, height: 25 }} /> 
            <QuizRuleQuestionType> Multiple Choice </QuizRuleQuestionType>
         </Stack>
         <Stack flexDirection="row" alignItems="center" gap={2}>
            <CheckCircleIcon color="success" sx={{ width: 25, height: 25 }} /> 
            <QuizRuleQuestionType> Matching </QuizRuleQuestionType>
         </Stack>
         <Stack flexDirection="row" alignItems="center" gap={2}>
            <CheckCircleIcon color="success" sx={{ width: 25, height: 25 }} /> 
            <QuizRuleQuestionType> True/False </QuizRuleQuestionType>
         </Stack>
         <Stack flexDirection="row" alignItems="center" gap={2}>
            <CancelIcon color="error" sx={{ width: 25, height: 25 }} /> 
            <QuizRuleQuestionType error> Writing </QuizRuleQuestionType>
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