import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/Core/Hooks';
import { Question } from '../Types/QuizTypes';
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
   // Todo : check interval type
   const intervalRef = useRef<NodeJS.Timeout | null>(null);
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
      <QuestionHeader 
         name={question.name}
         questionNumber={questionNumber}
         time={formattedTime(remainingTime)}
      />
   )
}

export default QuizHeader