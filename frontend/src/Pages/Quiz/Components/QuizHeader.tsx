import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/Core/Hooks';
import { MutableRefObject, useEffect, useState } from 'react';
import QuestionHeader from '@/Components/Question/QuestionHeader';
import { snackbar } from '@/Core/Utils';
import { QuizThunks } from '../Store/Quiz.thunk';

const formattedTime = (time: number | null): string => {
   if (!time) return '00:00';
   const minute = Math.trunc(time / 60);
   const second = Math.trunc(time % 60);
   const formattedMinute = minute === 0 ? '00' : minute.toString().length === 1 ? `0${minute}` : minute;
   const formatteSecond = second === 0 ? '00' : second.toString().length === 1 ? `0${second}` : second;
   return `${formattedMinute}:${formatteSecond}`;
};

type QuizHeaderProps = {
   intervalRef: MutableRefObject<ReturnType<typeof setInterval> | null>;
}

const QuizHeader = ({ intervalRef }: QuizHeaderProps) => {
   const [remainingTime, setRemainingTime] = useState<number | null>(null); // second
   
   const [searchParams] = useSearchParams();
   const { quiz, quizSession, answers } = useAppSelector((state) => state.Quiz);
   const questions = quiz.questions;

   const questionNumber = searchParams.get("question") as string;
   const question = questions[Number(questionNumber) - 1];

   if (intervalRef.current && remainingTime !== null && remainingTime === 0) {
      clearInterval(intervalRef.current);
   }

   useEffect(() => {
      if (remainingTime === 10) {
         snackbar("Last 10 seconds until the end of the quiz", { variant: 'info' })
      }
      if (remainingTime === 5) {
         snackbar("Last 5 seconds until the end of the quiz", { variant: 'info' })
      }
      if (remainingTime === 0) {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
         QuizThunks.completeQuizSession({ quizId: quiz.id, quizSessionId: quizSession.id, answers, completeTime: new Date().getTime() })
      }
   }, [remainingTime]);

   useEffect(() => {
      if (!quizSession.id) {
         return;
      }
      const diff = (new Date().getTime() - quizSession.startTime) / 1000; 
      const isTimeout = Math.ceil(diff) >= quizSession.totalTime;

      if (isTimeout) {
         setRemainingTime(0);
      } else {
         setRemainingTime(Math.floor(quizSession.totalTime - diff));
         intervalRef.current = setInterval(() => {
            setRemainingTime((prevTime) => {
               if (prevTime) return prevTime - 1;
               return prevTime;
            });
         }, 1000);
      }
      
      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, [quizSession]);

   return (
      <QuestionHeader 
         name={question.name}
         questionNumber={questionNumber}
         time={formattedTime(remainingTime)}
      />
   )
}

export default QuizHeader