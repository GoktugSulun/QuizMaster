import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import * as S from './Style/QuizRules.style';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import QuizRuleHeader from './Components/QuizRuleHeader';
import QuizRuleInfos from './Components/QuizRuleInfos';
import QuizRuleQuestionTypes from './Components/QuizRuleQuestionTypes';
import { useAppSelector, useThunk } from '@/Core/Hooks';
import { Loading } from '@/Core/Components';
import { QuizRulesThunks } from './Store/QuizRules.thunk';
import { QuizRulesActions } from './Store/QuizRules.slice';
import { useDispatch } from 'react-redux';
import { QuizStatusEnums } from '@/Constants/Enums';
import { QuizActions } from '../Quiz/Store/Quiz.slice';
import QuizSessionInfoModal from './Components/QuizSessionInfoModal/QuizSessionInfoModal';
import { type QuizWithQuestions } from '../Creator/Types/CreatorTypes';
import { type QuizSessionResponse } from '../Quiz/Types/QuizTypes';

/* 
   ? Required searchParam => id
   * This component must be displayed when the url is like that => /rules/quiz?id={id}
   ! If there is no "id" query, navigate user to dashboard.
*/

const QuizRules = () => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id") as string;
   
   if (!id) {
      return <Navigate to="/" replace />
   }

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const quizRules = useAppSelector((state) => state.QuizRules.quizRules);
   const startQuizResponse = useAppSelector((state) => state.QuizRules.startQuizResponse);
   const { isLoading, isSuccess, setIdle } = useThunk('startQuiz');
   const { 
      isLoading: isLoadingGetQuizRulesById, 
      isSuccess: isSuccessGetQuizRulesById, 
      setIdle: setIdleGetQuizRulesById, 
   } = useThunk('getQuizRulesById');

   const startQuizHandler = () => {
      QuizRulesThunks.startQuiz({ quizId: id })
   };

   const navigateToQuiz = (quiz: QuizWithQuestions, quizSession?: QuizSessionResponse) => {
      if (startQuizResponse?.status) {
         if (quizSession) {
            dispatch(QuizActions.setQuizSession(quizSession));
         }
         dispatch(QuizActions.setQuiz(quiz));
         navigate({ pathname: '/quiz', search: `?id=${id}&question=1` });
      }
   }

   useEffect(() => {
      if (isSuccess && startQuizResponse) {
         setIdle();
         switch (startQuizResponse.status) {
            case QuizStatusEnums.START_NEW_QUIZ:
               navigateToQuiz(startQuizResponse.quiz, startQuizResponse.quizSession);
               break;
            case QuizStatusEnums.CONTINUE_STARTED_QUIZ:
               navigateToQuiz(startQuizResponse.quiz, startQuizResponse.quizSession);
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
   }, [isSuccess, startQuizResponse]);

   useEffect(() => {
      if (isSuccessGetQuizRulesById) {
         setIdleGetQuizRulesById();
      }
   }, [isSuccessGetQuizRulesById]);

   useEffect(() => {
      QuizRulesThunks.getQuizRulesById(id);
      return () => {
         dispatch(QuizRulesActions.reset());
      }
   }, []);

   return (
      <S.QuizRules>
         <S.QuizRulesContent>
            { isLoadingGetQuizRulesById && <Loading blur /> }
            <Typography 
               color="primary" 
               textAlign="center" 
               fontWeight="bold" 
               variant="h4"
               marginBottom="10px"
            >
               Quiz Rules
            </Typography>
            <QuizRuleHeader 
               img={quizRules.image}
               name={quizRules.name} 
               description={quizRules.description} 
            />
            <Divider sx={{ margin: '40px 0' }} />
            <Stack flex={1} flexDirection="row">
               <Stack flex={1} alignItems="center" justifyContent="center">
                  <QuizRuleInfos />
               </Stack>
               <Box width="1px" alignSelf="stretch" bgcolor="rgba(0, 0, 0, 0.16)"> </Box>
               <Stack flex={1} alignItems="center" justifyContent="center">
                  <QuizRuleQuestionTypes />
               </Stack>
            </Stack>
            <Divider sx={{ margin: '40px 0' }} />
            <Stack alignItems="center">
               <Button 
                  onClick={startQuizHandler} 
                  sx={{ padding: "8px 60px", ":hover": { padding: "8px 80px" } }} 
                  disabled={isLoading}
               >
                  { isLoading ? <Loading size={25} color='#FFFFFF' /> : 'START'} 
               </Button>
            </Stack>
         </S.QuizRulesContent>
         <QuizSessionInfoModal />
      </S.QuizRules>
   )
}

export default QuizRules