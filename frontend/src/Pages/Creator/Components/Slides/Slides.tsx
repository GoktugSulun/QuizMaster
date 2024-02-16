import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../../Style/Creator.style';
import Slide from './Components/Slide';
import { Box, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CorrectOptionEnums, PointEnums, QuestionEnums, type QuestionType } from '../../Model/Creator.model';

const Slides = () => {
   const form = useFormContext();
   const questions = useFieldArray({ name: "questions", control: form.control });
   
   const watchedQuestions = form.watch("questions");
   const controlledQuestions = questions.fields.map((field, index) => {
      return {
        ...field,
        ...watchedQuestions[index]
      };
    });

   const addQuestionHandler = () => {
      const newQuestion: QuestionType = { 
         name: "", 
         options: [1,2,3,4].map(() => ({ name: "", isCorrect: false })),
         type: QuestionEnums.MULTIPLE_CHOICE,
         point: PointEnums.STANDART,
         optionType: CorrectOptionEnums.SINGLE_OPTION
      };
      const activeIndex = form.getValues("activeIndex") as number;
      questions.insert(activeIndex + 1, newQuestion);
      form.setValue("activeIndex", activeIndex + 1);
   };

   return (
      // 80px: header, 30px: 15+15 padding for parent, 20px: 10+10 padding for root,
      <S.Slides>
         <Box 
            maxHeight="calc(100vh - 80px - 30px - 20px - 55px)" 
            overflow="auto"
            sx={{ "::-webkit-scrollbar": { width: "5px" } }}
            boxShadow= "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
         >
            {controlledQuestions.map((field, index) => (
               <Slide 
                  key={field.id} 
                  field={field as QuestionType} 
                  index={index} 
               />
            ))}
         </Box>
         <Stack 
            alignItems="center" 
            justifyContent="center"
            marginTop="10px"
            height="50px"
         >
            <Button onClick={addQuestionHandler} startIcon={<AddIcon />}> Add Question </Button>
         </Stack>
      </S.Slides>
   )
}

export default Slides