import { useAppSelector } from '@/Core/Hooks';
import * as S from '../Style/QuizResult.style';
import Question from './Question';

const Answers = () => {
   const { quizResult } = useAppSelector((state) => state.QuizResult)

   return (
      <S.Answers sx={{ scrollMarginTop: "100px" }} id="answers">
         { quizResult.questionsWithResults.map((question, index) => (
            <Question 
               key={question.id} 
               question={question} 
               index={index} 
            />
         )) }
      </S.Answers>
   )
}

export default Answers