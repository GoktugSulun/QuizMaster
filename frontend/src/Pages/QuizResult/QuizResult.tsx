import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/QuizResult.style';
import PieChart from './Components/PieChart';
import { Box, Stack, Typography } from '@mui/material';
import ResultOverview from './Components/ResultOverview';
import Answers from './Components/Answers';
import { useEffect } from 'react';

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

   useEffect(() => {
      console.log("fetch data with quizId: ", quizId, " and resultId: ", resultId);
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
               ASAL SAYILAR - QUIZ RESULT
            </Typography>
            <Stack flex={1} rowGap={3} padding="20px 0" flexDirection={{ xs: "column", lg: "row" }}>
               <Box minHeight={{ xs: '400px', lg: 'auto' }} flex={1}> <PieChart /> </Box>
               <Box width="1px" height="100%" bgcolor="secondary.light" />
               <ResultOverview  />
            </Stack>
         </S.QuizResultContent>
         <Answers />
      </S.QuizResult>
   )
}

export default QuizResult;