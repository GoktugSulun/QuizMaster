import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/Quiz.style';
import QuizHeader from './Components/QuizHeader';
import { Divider } from '@mui/material';
import QuizPagination from './Components/QuizPagination';
import Options from './Components/Options';
import { useAppSelector, useThunk } from '@/Core/Hooks';
import { useEffect } from 'react';
import { QuizThunks } from './Store/Quiz.thunk';
import { Loading } from '@/Core/Components';

/*
   ? Required searchParams => id & question
   * This component must be displayed when the url is like that => /quiz?id=1&question=1
   ! If "id" or "question" query is missing, then navigate user to dashboard.
*/

const Quiz = () => {
   const [searchParams] = useSearchParams();
   const quiz = useAppSelector((state) => state.Quiz.quiz);
   
   const id = searchParams.get("id");
   const question = searchParams.get("question");

   const { isSuccess, setIdle } = useThunk("getQuestions");

   if (!id || !question) {
      return <Navigate to="/" replace />
   }

   useEffect(() => {
      if (!quiz.id) {
         QuizThunks.getQuestions();
      }
   }, [quiz]);

   useEffect(() => {
      setIdle();
   }, [isSuccess]);

   if (!quiz.id) {
      return (
         <S.Quiz>
            <S.QuizContent>
               <Loading size={80} />
            </S.QuizContent>
         </S.Quiz>
      )
   }

   return (
      <S.Quiz>
         <S.QuizContent>
            <QuizHeader />
            <Options />
            <Divider />
            <QuizPagination />
         </S.QuizContent>
      </S.Quiz>
   )
}

export default Quiz;

