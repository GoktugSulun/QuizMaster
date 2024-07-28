import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/QuizResult.style';
import PieChart from './Components/PieChart';
import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import ResultOverview from './Components/ResultOverview';
import Answers from './Components/Answers';
import { useEffect } from 'react';
import QuizResultThunks from './Store/QuizResult.thunk';
import { useAppSelector } from '@/Core/Hooks';

/*
   ? Required searchParams => quizId and resultId
   * This component must be displayed when the url is like that => /results/quiz?quizId=1&resultId=1
   ! If "quizId" or "resultId" query is missing, then navigate user to dashboard.
   TODO : Ya da navigate ettirmek yerine result bulunamadı gibi bir popup gösterilebilir
*/

const QuizResult = () => {
   const [searchParams] = useSearchParams();
   const quizId = searchParams.get("quizId") as string;
   const resultId = searchParams.get("resultId") as string;

   // Todo : /results/quiz?quizId=null ya da /results/quiz?quizId=aaa gibi durumlar için de kontrol yap, belki istek sonrası error ise bulunamadı gibi bir component render edilebilir.
   if (!quizId || !resultId) { 
      return <Navigate to="/" replace />
   }

   const theme = useTheme();
   const { quizResult } = useAppSelector((state) => state.QuizResult);
   const data = [
      { id: "1", value: quizResult.totalCorrect, label: 'Correct', color: alpha(theme.palette.success.light, 0.8) },
      { id: "2", value: quizResult.totalWrong, label: 'Wrong', color: alpha(theme.palette.error.light, 0.8) },
      { id: "3", value: quizResult.totalBlank, label: 'Blank', color: theme.palette.grey[300] },
   ]

   useEffect(() => {
      if (resultId && quizId) {
         QuizResultThunks.getQuizResult(resultId);
         QuizResultThunks.getAllSessions(quizId);
      }
   }, [quizId, resultId])

   return (
      <S.QuizResult>
         <S.QuizResultContent>
            <Typography 
               variant="h4" 
               textAlign="center"
               margin="20px 10px"
               padding="20px"
               borderRadius="10px"
               color="primary.main"
               fontWeight="bold"
               boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            > 
               { quizResult.quiz.name }
            </Typography>
            <Stack flex={1} rowGap={3} padding="20px 0" flexDirection={{ xs: "column", lg: "row" }}>
               <Box minHeight={{ xs: '400px', lg: 'auto' }} flex={1}> <PieChart data={data} /> </Box>
               <Box width="1px" height="100%" bgcolor="secondary.light" />
               <ResultOverview />
            </Stack>
         </S.QuizResultContent>
         <Answers />
      </S.QuizResult>
   )
}

export default QuizResult;