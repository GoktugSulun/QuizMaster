import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/QuizResult.style';
import PieChart from './Components/PieChart';
import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import ResultOverview from './Components/ResultOverview';
import Answers from './Components/Answers';
import { useEffect, useMemo } from 'react';
import QuizResultThunks from './Store/QuizResult.thunk';
import { useAppSelector, useThunk } from '@/Core/Hooks';
import ResultOptions from './Components/ResultOptions';
import { Loading } from '@/Core/Components';

/*
   ? Required searchParams => quizId and resultId
   * This component must be displayed when the url is like that => /results/quiz?quizId=1&resultId=1
   ! If "quizId" or "resultId" query is missing, then navigate user to dashboard.
   TODO : Ya da navigate ettirmek yerine result bulunamadı gibi bir popup gösterilebilir
*/

const QuizResult = () => {
   const theme = useTheme();
   const [searchParams, setSearchParams] = useSearchParams();
   const { quizResult, allResults } = useAppSelector((state) => state.QuizResult);

   const { isLoading } = useThunk("getQuizResult");
   const { isSuccess: isSuccessGetAllSessions } = useThunk("getAllSessions");
   const data = useMemo(() => (
      [
         { id: "1", value: quizResult.totalCorrect, label: 'Correct', color: alpha(theme.palette.success.light, 0.8) },
         { id: "2", value: quizResult.totalWrong, label: 'Wrong', color: alpha(theme.palette.error.light, 0.8) },
         { id: "3", value: quizResult.totalBlank, label: 'Blank', color: theme.palette.grey[300] },
      ]
   ), [quizResult, theme.palette])
   
   const quizId = searchParams.get("quizId") as string;
   const resultId = searchParams.get("resultId") as string;

   useEffect(() => {
      if (quizId) {
         QuizResultThunks.getAllSessions(quizId);
      }
   }, [quizId])

   useEffect(() => {
      if (!resultId && isSuccessGetAllSessions) {
         if (allResults.length > 0) {
            searchParams.set("resultId", allResults[0].resultId);
            setSearchParams(searchParams);
         } else {
            console.log("navigate user to another page");
         }
      }
   }, [resultId, allResults.length, isSuccessGetAllSessions])

   // Todo : /results/quiz?quizId=null ya da /results/quiz?quizId=aaa gibi durumlar için de kontrol yap, belki istek sonrası error ise bulunamadı gibi bir component render edilebilir.
   if (!quizId) { 
      return <Navigate to="/" replace />
   }

   return (
      <S.QuizResult>
         <S.QuizResultContent>
            { isLoading && <Loading blur size={80} /> }
            <Stack
               flexDirection={"row"}
               alignItems={"center"}
               justifyContent={(allResults.length === 0 || allResults.length === 1) ? "center" : "space-between"}
               boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
               margin="20px 10px"
               borderRadius="10px"
               padding="20px"
            >
               <Typography 
                  variant="h4" 
                  textAlign="center"
                  color="primary.main"
                  fontWeight="bold"
               > 
                  { quizResult.quiz.name }
               </Typography>
               { allResults.length > 1 && <ResultOptions /> }
            </Stack>
            <Stack flex={1} rowGap={3} padding="20px 0" flexDirection={{ xs: "column", lg: "row" }}>
               <Box minHeight={{ xs: '400px', lg: 'auto' }} flex={1}> <PieChart data={data} /> </Box>
               <Box width="1px" height="100%" bgcolor="secondary.light" />
               <ResultOverview />
            </Stack>
         </S.QuizResultContent>
         { !isLoading && <Answers /> }
      </S.QuizResult>
   )
}

export default QuizResult;