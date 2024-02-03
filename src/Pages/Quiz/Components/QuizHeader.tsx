import { Stack, Typography } from '@mui/material';
import * as S from '../Style/Quiz.style';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/Core/Hooks';
import { Question } from '../Models/Quiz.model';
import { useEffect, useRef, useState } from 'react';

const formattedTime = (time: number | null): string => {
   if (!time) return '00:00';
   const minute = Math.trunc(time / 60);
   const second = Math.trunc(time % 60);
   const formattedMinute = minute === 0 ? '00' : minute.toString().length === 1 ? `0${minute}` : minute;
   const formatteSecond = second === 0 ? '00' : second.toString().length === 1 ? `0${second}` : second;
   return `${formattedMinute}:${formatteSecond}`;
};

const QuizHeader = () => {
   const intervalRef = useRef<number | null>(null);
   const [searchParams] = useSearchParams();
   const questions = useAppSelector((state) => state.Quiz.quiz.questions);
   const [remainingTime, setRemainingTime] = useState<number | null>(null); // second

   const questionNumber = searchParams.get("question") as string;
   const question = questions.find((_, index) => +questionNumber === index + 1) as Question;

   if (remainingTime !== null && remainingTime === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
   }

   useEffect(() => {
      setRemainingTime(question.time);
      intervalRef.current = setInterval(() => {
         setRemainingTime((prevTime) => {
            if (prevTime) return prevTime - 1;
            return prevTime;
         });
      }, 1000);
      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, []);

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
            <Typography fontWeight="bold" color="primary.main" fontSize={25}> {formattedTime(remainingTime)} </Typography>
         </S.Time>
      </S.QuizHeader>
   )
}

export default QuizHeader