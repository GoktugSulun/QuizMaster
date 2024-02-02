import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/Quiz.style';
import { useEffect } from 'react';
import QuizHeader from './Components/QuizHeader';
import { Box } from '@mui/material';
import QuizPagination from './Components/QuizPagination';

/*
   ? Required searchParams => id & question
   * This component must be displayed when the url is like that => /quiz?id=1&question=1
   ! If "id" or "question" query is missing, then navigate to user to dashboard.
*/

const Quiz = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();

   useEffect(() => {
      const id = searchParams.get("id");
      const question = searchParams.get("question");
      console.log('id: ', id);
      console.log('question: ', question);
      
      if (!id || !question) {
         navigate('/', { replace: true });
      }
   }, [searchParams]);

   return (
      <S.Quiz>
         <S.QuizContent>
            <QuizHeader />
            <Box flex={1}> body </Box>
            <QuizPagination />
         </S.QuizContent>
      </S.Quiz>
   )
}

export default Quiz