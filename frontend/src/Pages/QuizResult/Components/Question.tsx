import { type Question as QuestionType } from '@/Pages/Quiz/Types/QuizTypes';
import * as S from '../Style/QuizResult.style';
import QuestionHeader from '@/Components/Question/QuestionHeader';
import MultipleChoice from '@/Components/Question/MultipleChoice';
import { Box } from '@mui/material';
import { QuestionEnums } from '@/Constants/Enums';
import ShortAnswer from '@/Components/Question/ShortAnswer';

const Question = ({ question, index }: { question: QuestionType, index: number }) => {   

   const answersBelongToUsers = question.options.map((option) => option.userAnswer || "").filter((option) => option)
   const isCorrect = (() => {
      if (question.type === QuestionEnums.SHORT_ANSWER) {
         return !!question.options.find((option) => option.userAnswer ? answersBelongToUsers.includes(option.userAnswer) : false)
      } else {
         return !!question.options.find((option) => option.isCorrect && (option.id === question.selectedOptionId))
      }
   })()

   return (
      <S.Question>
         <QuestionHeader
            name={question.name}
            questionNumber={index + 1}
            isCorrect={isCorrect}
            isBlank={question.type === QuestionEnums.SHORT_ANSWER ? question.options.every((option) => !option.userAnswer) : question.selectedOptionId === ""}
            point={question.point}
         />
         <Box padding="40px">
            {
               question.type === QuestionEnums.SHORT_ANSWER
                  ?  (
                        <ShortAnswer
                           readOnly
                           options={question.options}
                           correctAnswers={question.options.map((option) => ({ answerId: option.id, text: option.name }))}
                           answersBelongToUsers={answersBelongToUsers}
                        />
                  )
                  : (
                        <MultipleChoice 
                           readOnly
                           checked={(option) => option.id === question.selectedOptionId}
                           options={question.options}
                        />
                  )
            }
         </Box>
      </S.Question>
   )
}

export default Question