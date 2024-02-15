import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../../Style/Creator.style';
import Slide from './Components/Slide';
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { QuestionType } from '../../Model/Creator.model';

const Slides = () => {
   const form = useFormContext();
   const questions = useFieldArray({ name: "questions", control: form.control });

   const addQuestionHandler = () => {
      const newQuestion = { 
         name: "", 
         options: [1,2,3,4].map(() => ({ name: "", isCorrect: false })) 
      };
      const activeIndex = form.getValues("activeIndex") as number;
      questions.insert(activeIndex, newQuestion);
      form.setValue("activeIndex", activeIndex + 1);
   };

   return (
      <S.Slides>
         {questions.fields.map((field, index) => (
            <Slide 
               key={field.id} 
               field={field as QuestionType} 
               index={index} 
            />
         ))}
         <Stack alignItems="center">
            <Button onClick={addQuestionHandler} startIcon={<AddIcon />}> Add Question </Button>
         </Stack>
      </S.Slides>
   )
}

export default Slides