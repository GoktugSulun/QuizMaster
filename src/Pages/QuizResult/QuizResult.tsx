import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/QuizResult.style';
import PieChart from './Components/PieChart';
import { Box, Stack, Typography } from '@mui/material';
import Results from './Components/Results';

/*
   ? Required searchParams => id 
   * This component must be displayed when the url is like that => /result/quiz?id=1
   ! If "id" query is missing, then navigate user to dashboard.
*/

const QuizResult = () => {
   const [searchParams] = useSearchParams();
   const quizId = searchParams.get("id") as string;

   // Todo : /result/quiz?id=null ya da /result/quiz?id=aaa gibi durumlar için de kontrol yap, belki istek sonrası error ise bulunamadı gibi bir component render edilebilir.
   if (!quizId) { 
      return <Navigate to="/" replace />
   }

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
               <Results />
            </Stack>
         </S.QuizResultContent>
      </S.QuizResult>
   )
}

export default QuizResult;