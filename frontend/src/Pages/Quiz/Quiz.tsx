import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/Quiz.style';
import QuizHeader from './Components/QuizHeader';
import { Divider } from '@mui/material';
import QuizPagination from './Components/QuizPagination';
import Options from './Components/Options';
import { useAppDispatch, useAppSelector, useThunk } from '@/Core/Hooks';
import { useEffect } from 'react';
import { QuizThunks } from './Store/Quiz.thunk';
import { Loading } from '@/Core/Components';
import { AppConfigActions } from '@/Core/Store/AppConfig.slice';

/*
   ? Required searchParams => id & question
   * This component must be displayed when the url is like that => /quiz?id=1&question=1
   ! If "id" or "question" query is missing, then navigate user to dashboard.
*/

const Quiz = () => {
   const [searchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const quiz = useAppSelector((state) => state.Quiz.quiz);
   const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);
   
   const id = searchParams.get("id");
   const question = searchParams.get("question");

   const { isSuccess, setIdle } = useThunk("getQuestions");

   if (!id || !question) {
      return <Navigate to="/" replace />
   }

   useEffect(() => {
      if (!quiz.id) {
         QuizThunks.getQuizByIdWithQuestions(id);
         // Todo: session start
      }
   }, [quiz]);

   useEffect(() => {
      setIdle();
   }, [isSuccess]);

   useEffect(() => {
      if (isOpenSidebar) {
         dispatch(AppConfigActions.setIsOpenSidebar('CLOSE'));
      }
      
      const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
         e.preventDefault();
         (e || window).returnValue = true; 
      }

      window.addEventListener("beforeunload", beforeUnloadHandler);
      return () => {
         window.removeEventListener("beforeunload", beforeUnloadHandler)
      }
   }, []);

   if (!quiz.id) {
      return (
         <S.Quiz>
            <S.QuizContent>
               <Loading fullWidth size={80} />
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

