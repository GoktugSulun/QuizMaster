import { FormControlLabel, Grid, Radio, Stack } from '@mui/material';
import * as S from '../Style/Quiz.style';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { QuizActions } from '../Store/Quiz.slice';

const MultipleChoice = () => {
   const dispatch = useAppDispatch();
   const [searchParams] = useSearchParams();
   const { questions, answers } = useAppSelector((state) => state.Quiz);

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
         <Grid container rowSpacing={5} columnSpacing={3}>
            {
               options.map((option) => (
                  <Grid key={option.id} item md={6}>
                     <S.AnswerBox>
                        <FormControlLabel 
                           value={option.id} 
                           label={option.name}
                           control={
                              <Radio
                                 checked={!!answers.find((answer) => answer.answerId === option.id)}
                                 onClick={() => setAnswerHandler(option.id)}
                                 value={option.id}
                              />
                           } 
                        />
                     </S.AnswerBox>
                  </Grid>
               ))
            }
         </Grid>
      </Stack>
   )
}

export default MultipleChoice