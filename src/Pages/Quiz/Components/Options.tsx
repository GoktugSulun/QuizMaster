import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { QuizActions } from '../Store/Quiz.slice';
import MultipleChoice from '@/Components/Question/MultipleChoice';

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
      <MultipleChoice
         onClick={(option) => setAnswerHandler(option.id)}
         checked={(option) => !!answers.find((answer) => answer.answerId === option.id)}
         options={options}
      />
   )
}

export default Options