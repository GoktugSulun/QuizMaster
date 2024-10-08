import { Navigate, useSearchParams } from 'react-router-dom';
import * as S from './Style/Quiz.style';
import QuizHeader from './Components/QuizHeader';
import { Divider } from '@mui/material';
import QuizPagination from './Components/QuizPagination';
import Options from './Components/Options';
import { useAppDispatch, useAppSelector, useThunk } from '@/Core/Hooks';
import { useEffect, useRef } from 'react';
import { Loading } from '@/Core/Components';
import { AppConfigActions } from '@/Core/Store/AppConfig.slice';
import { QuizRulesThunks } from '../QuizRules/Store/QuizRules.thunk';
import { QuizStatusEnums, RouteEnums } from '@/Constants/Enums';
import { QuizActions } from './Store/Quiz.slice';
import { type QuizWithQuestions } from '../Creator/Types/CreatorTypes';
import { type QuizSessionResponse } from './Types/QuizTypes';
import { QuizRulesActions } from '../QuizRules/Store/QuizRules.slice';
import QuizSessionInfoModal from '../QuizRules/Components/QuizSessionInfoModal/QuizSessionInfoModal';
import InfoModal from './Components/InfoModal';

/*
   ? Required searchParams => id & question
   * This component must be displayed when the url is like that => /quiz?id=1&question=1
   ! If "id" or "question" query is missing, then navigate user to dashboard.
*/

const Quiz = () => {
   const [searchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const { quiz, quizSession, answers } = useAppSelector((state) => state.Quiz);
   const { startQuizResponse, isOpenSessionInfoModal } = useAppSelector((state) => state.QuizRules);
   const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);
   const answersRef = useRef({ answers, canContinue: quizSession.totalAttempt <= quizSession.maxAttempt });
   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

   const id = searchParams.get("id");
   const question = searchParams.get("question");

   const { isSuccess, setIdle } = useThunk("getQuestions");
   const { isSuccess: isSuccessStartQuiz, setIdle: setIdleStartQuiz } = useThunk("startQuiz");
   const { isSuccess: isSuccessCompleteQuizSession, isLoading: isLoadingCompleteQuizSession  } = useThunk("completeQuizSession");

   if (!id || !question) {
      return <Navigate to={RouteEnums.FEED} replace />
   }

   const setQuizInfo = (quiz: QuizWithQuestions, quizSession?: QuizSessionResponse) => {
      if (startQuizResponse?.status) {
         if (quizSession) {
            dispatch(QuizActions.setQuizSession(quizSession));
         }
         dispatch(QuizActions.setQuiz(quiz));
      }
   }

   useEffect(() => {
      if (!quiz.id) {
         QuizRulesThunks.startQuiz({ quizId: id });
      }
   }, [quiz]);

   useEffect(() => {
      answersRef.current = { answers, canContinue: quizSession.totalAttempt <= quizSession.maxAttempt };
   }, [answers, quizSession]);

   useEffect(() => {
      if (isSuccessStartQuiz && startQuizResponse) {
         setIdleStartQuiz();
         switch (startQuizResponse.status) { 
            case QuizStatusEnums.START_NEW_QUIZ:
               setQuizInfo(startQuizResponse.quiz, startQuizResponse.quizSession);
               break;
            case QuizStatusEnums.CONTINUE_STARTED_QUIZ:
               setQuizInfo(startQuizResponse.quiz, startQuizResponse.quizSession);
               break; 
            case QuizStatusEnums.EXCEED_ATTEMPT:
               dispatch(QuizRulesActions.setIsOpenSessionModal("OPEN"));
               break;
            case QuizStatusEnums.TIMEOUT:
               dispatch(QuizRulesActions.setIsOpenSessionModal("OPEN"));
               break;
            default:
               throw new Error("Unknown QuizStatusEnums");
         }
      }
   }, [isSuccessStartQuiz, startQuizResponse]);

   useEffect(() => {
      setIdle();
   }, [isSuccess]);

   useEffect(() => {
      if (isSuccessCompleteQuizSession) {
         dispatch(QuizActions.setIsOpenInfoModal("OPEN"));
      }
   }, [isSuccessCompleteQuizSession]);

   useEffect(() => {
      if (quiz.id) {
         if (quizSession?.answers?.length) {
            dispatch(QuizActions.setAnswers(quizSession?.answers || []))
         }
      }
   }, [quiz, quizSession]);

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
         dispatch(QuizActions.reset());
         window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
   }, []);

   if (!quiz.id || isOpenSessionInfoModal || isSuccessCompleteQuizSession) {
      return (
         <S.Quiz>
            <S.QuizContent>
               <Loading fullWidth size={80} />
               <QuizSessionInfoModal isQuizPage />
               <InfoModal />
            </S.QuizContent>
         </S.Quiz>
      )
   }

   //* URL üzerinden soru değiştirilmeye çalışılırsa ve o soru bulunamazsa kullanıcıyı ana sayfaya yönlendirir.
   if (quiz.questions.length > 0 && !!question && !quiz.questions[Number(question) - 1]) {
      return <Navigate to={RouteEnums.FEED} replace />
   }

   return (
      <S.Quiz>
         <S.QuizContent>
            { isLoadingCompleteQuizSession && <Loading fullWidth size={80} blur /> }
            <QuizHeader intervalRef={intervalRef} />
            <Options />
            <Divider />
            <QuizPagination intervalRef={intervalRef} />
            <QuizSessionInfoModal isQuizPage />
            <InfoModal />
         </S.QuizContent>
      </S.Quiz>
   )
}

export default Quiz;

