import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/Quiz.style';
import QuizHeader from './Components/QuizHeader';
import { Box, Divider } from '@mui/material';
import QuizPagination from './Components/QuizPagination';
import MultipleChoice from './Components/MultipleChoice';

/*
   ? Required searchParams => id & question
   * This component must be displayed when the url is like that => /quiz?id=1&question=1
   ! If "id" or "question" query is missing, then navigate to user to dashboard.
*/

const Quiz = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   
   const id = searchParams.get("id");
   const question = searchParams.get("question");


   if (!id || !question) {
      return <Navigate to="/" replace />
   }

   return (
      <S.Quiz>
         <S.QuizContent>
            <QuizHeader />
            <MultipleChoice />
            <Divider />
            <QuizPagination count={10} />
         </S.QuizContent>
      </S.Quiz>
   )
}

export default Quiz