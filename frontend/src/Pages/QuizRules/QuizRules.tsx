import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import * as S from './Style/QuizRules.style';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import img1 from '../../Pngs/img-1.jpg';
import QuizRuleHeader from './Components/QuizRuleHeader';
import QuizRuleInfos from './Components/QuizRuleInfos';
import QuizRuleQuestionTypes from './Components/QuizRuleQuestionTypes';
import { QuizThunks } from '../Quiz/Store/Quiz.thunk';
import { useThunk } from '@/Core/Hooks';
import { Loading } from '@/Core/Components';

const data = {
   id: 1, 
   title: 'Asal Sayılar adpajpokasopdap padasdsapodsak adpakaspokdsaop sosos ososods', 
   description: '1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş! 1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş! 1-Asıl sayılara dair en önemli bilgilerin yer aldığı bu quizi çöz ve eskiklerini tamamla, bizimle başarıya ulaş!',
   created_at: new Date(),
   updated_at: new Date(),
   img: img1,
   time: '00:30 sec',
   liked: true,
};

/* 
   ? Required searchParam => id
   * This component must be displayed when the url is like that => /rules/quiz?id={id}
   ! If there is no "id" query, navigate user to dashboard.
*/

const QuizRules = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const { isLoading, isSuccess, setIdle } = useThunk('getQuestions');

   const navigateToQuizHandler = () => {
      QuizThunks.getQuestions();
   };

   useEffect(() => {
      if (isSuccess) {
         setIdle();
         const id = searchParams.get("id") as string;
         navigate({ pathname: '/quiz', search: `?id=${id}&question=1` }, { replace: true });
      }
   }, [isSuccess]);
   
   if (!searchParams.get("id")) {
      return <Navigate to="/" replace />
   }

   return (
      <S.QuizRules>
         <S.QuizRulesContent>
            <Typography color="primary" textAlign="center" fontWeight="bold" variant="h4">
               Quiz Rules
            </Typography>
            <QuizRuleHeader img={data.img} title={data.title} description={data.description} />
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
                  onClick={navigateToQuizHandler} 
                  sx={{ padding: "8px 60px", ":hover": { padding: "8px 80px" } }} 
                  disabled={isLoading}
               >
                  { isLoading ? <Loading size={25} color='#FFFFFF' /> : 'START'} 
               </Button>
            </Stack>
         </S.QuizRulesContent>
      </S.QuizRules>
   )
}

export default QuizRules