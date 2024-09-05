import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { QuizActions } from '../Store/Quiz.slice';
import MultipleChoice from '@/Components/Question/MultipleChoice';
import { Stack } from '@mui/material';
import { QuestionEnums } from '@/Constants/Enums';
import ShortAnswer from '@/Components/Question/ShortAnswer';

export type ShortAnswerFuncParams = { answerId: string; text: string; index: number }

const Options = () => {
   const dispatch = useAppDispatch();
   const [searchParams] = useSearchParams();
   const { quiz: { questions }, answers } = useAppSelector((state) => state.Quiz);

   const questionId = searchParams.get("question") as string;
   const question = questions[Number(questionId) - 1];
   const options = question.options;
   
   const setAnswerHandler = (selectedId: string) => {
      const isSelected = !!answers.find((answer) => answer.answerId === selectedId);
      dispatch(QuizActions.setAnswer({ questionId: question.id, answerId: isSelected ? null : selectedId }));
   }; 

   const setShortAnswerHandler = (params: ShortAnswerFuncParams) => {
      const { answerId, text, index } = params;
      const shortAnswers = answers.find((answer) => answer.questionId === question.id)?.answers || [];
      const newAnswers = [...shortAnswers];
      newAnswers[index] = { answerId, text }
      dispatch(QuizActions.setAnswer({ questionId: question.id, answers: newAnswers }));
   }; 

   return (
      <Stack 
         flex={1} 
         justifyContent="center" 
         alignItems="center"
         padding="0 50px"
         margin={{ xs: "20px 0" }}
      >
         {
            question.type === QuestionEnums.SHORT_ANSWER
               ? (
                  <ShortAnswer
                     onChange={setShortAnswerHandler}
                     userAnswers={answers.find((answer) => answer.questionId === question.id)?.answers || []}
                     options={options}
                  />
               )
               : (
                  <MultipleChoice
                     onClick={(option) => setAnswerHandler(option.id)}
                     checked={(option) => !!answers.find((answer) => answer.answerId === option.id)}
                     options={options}
                  />
               )
         }
      </Stack>
   )
}

export default Options