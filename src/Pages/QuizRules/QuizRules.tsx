import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import * as S from './Style/QuizRules.style';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import img1 from '../../Pngs/img-1.jpg';
import QuizRuleHeader from './Components/QuizRuleHeader';
import QuizRuleInfos from './Components/QuizRuleInfos';
import QuizRuleQuestionTypes from './Components/QuizRuleQuestionTypes';

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

const QuizRules = () => {
   const [searchParams] = useSearchParams();

   useEffect(() => {
      console.log(searchParams.get("id"), 'searchParams');
   }, [searchParams]);

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
               <Button sx={{ padding: "8px 60px", ":hover": { padding: "8px 80px" } }} > START </Button>
            </Stack>
         </S.QuizRulesContent>
      </S.QuizRules>
   )
}

export default QuizRules