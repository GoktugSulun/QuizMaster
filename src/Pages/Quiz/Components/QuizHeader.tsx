import { Stack, Typography } from '@mui/material';
import * as S from '../Style/Quiz.style';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/Core/Hooks';
import { Question } from '../Models/Quiz.model';

const QuizHeader = () => {
   const [searchParams] = useSearchParams();
   const questionNumber = searchParams.get("question") as string;
   const questions = useAppSelector((state) => state.Quiz.questions);

   const question = questions.find((_, index) => +questionNumber === index + 1) as Question;

   return (
      <S.QuizHeader flexDirection="row" alignItems="flex-start" gap={2}>
         <Stack alignSelf="center" flexDirection="row" flex={1}>
            <Typography 
               fontWeight="bold" 
               marginRight={2} 
               fontSize={20} 
               variant="body1"
            > 
               {questionNumber}) 
            </Typography>
            <Typography alignSelf="center" paragraph fontSize={20} flex={1}> {question.name} </Typography> 
         </Stack>
         <S.Time flexDirection="row" alignItems="center" gap={1}>
            <AccessAlarmIcon sx={{ width: 30, height: 30 }} color="primary" />
            <Typography fontWeight="bold" color="primary.main" fontSize={25}> 15:30 </Typography>
         </S.Time>
      </S.QuizHeader>
   )
}

export default QuizHeader