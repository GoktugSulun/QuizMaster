import { type Question as QuestionType} from '@/Pages/Quiz/Models/Quiz.model';
import * as S from '../Style/QuizResult.style';
import QuestionHeader from '@/Components/Question/QuestionHeader';
import MultipleChoice from '@/Components/Question/MultipleChoice';
import { Box } from '@mui/material';

const Question = ({ question, index }: { question: QuestionType, index: number }) => {   

   return (
      <S.Question>
         <QuestionHeader
            name={question.name}
            questionNumber={index + 1}
            isCorrect={!!question.options.find((option) => option.isCorrect && (option.id === question.selectedOptionId))}
         />
         <Box padding="40px">
            <MultipleChoice 
               readOnly
               checked={(option) => option.id === question.selectedOptionId}
               options={question.options}
            />
         </Box>
      </S.Question>
   )
}

export default Question