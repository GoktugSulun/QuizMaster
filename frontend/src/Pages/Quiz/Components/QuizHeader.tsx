import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/Core/Hooks';
import { useEffect, useRef, useState } from 'react';
import QuestionHeader from '@/Components/Question/QuestionHeader';

const formattedTime = (time: number | null): string => {
   if (!time) return '00:00';
   const minute = Math.trunc(time / 60);
   const second = Math.trunc(time % 60);
   const formattedMinute = minute === 0 ? '00' : minute.toString().length === 1 ? `0${minute}` : minute;
   const formatteSecond = second === 0 ? '00' : second.toString().length === 1 ? `0${second}` : second;
   return `${formattedMinute}:${formatteSecond}`;
};

const QuizHeader = () => {
   const [remainingTime, setRemainingTime] = useState<number | null>(null); // second
   const intervalRef = useRef<NodeJS.Timeout | null>(null);  // Todo : check interval type
   const [searchParams] = useSearchParams();
   const quizSession = useAppSelector((state) => state.Quiz.quizSession);
   const quiz = useAppSelector((state) => state.Quiz.quiz);
   const questions = quiz.questions;

   const questionNumber = searchParams.get("question") as string;
   const question = questions[Number(questionNumber) - 1];

   if (remainingTime !== null && remainingTime === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
   }

   useEffect(() => {
      if (!quizSession.id) {
         return;
      }
      const diff = (new Date().getTime() - quizSession.startTime) / 1000; 
      const isTimeout = Math.ceil(diff) >= quizSession.totalTime;
      
      if (isTimeout) {
         setRemainingTime(0);
      } else {
         setRemainingTime(quizSession.totalTime - diff);
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