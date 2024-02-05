import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { QuizActions } from '../Store/Quiz.slice';
import MultipleChoice from '@/Components/Question/MultipleChoice';
import { Stack } from '@mui/material';

const Options = () => {
   const dispatch = useAppDispatch();
   const [searchParams] = useSearchParams();
   const { quiz: { questions }, answers } = useAppSelector((state) => state.Quiz);

   const questionId = searchParams.get("question") as string;
   const options = questions.find((question) => question.id === +questionId)?.options || [];
   
   const setAnswerHandler = (selectedId: number) => {
      const isSelected = !!answers.find((answer) => answer.answerId === selectedId);
      dispatch(QuizActions.setAnswer({ questionId: +questionId, answerId: isSelected ? null : selectedId }));
   };

   if (!options) {
      // Todo : handle it
      console.log('seçenekler bulunamadı ?');
   }  

   return (
      <Stack 
         flex={1} 
         justifyContent="center" 
         alignItems="center"
         padding="0 50px"
      >
         <MultipleChoice
            onClick={(option) => setAnswerHandler(option.id)}
            checked={(option) => !!answers.find((answer) => answer.answerId === option.id)}
            options={options}
         />
      </Stack>
   )
}

export default Options