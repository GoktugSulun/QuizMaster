import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../../Style/Creator.style';
import Slide from './Components/Slide';
import { Box, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CorrectOptionEnums, PointEnums, QuestionEnums, type QuestionType } from '../../Model/Creator.model';

const Slides = () => {
   const form = useFormContext();
   const questions = useFieldArray({ name: "questions", control: form.control });

   const watchedQuestions = form.watch("questions") as QuestionType[];
   const controlledQuestions = watchedQuestions.map((field, index) => {
      return {
        ...field,
        ...watchedQuestions[index]
      };
   });

   const addQuestionHandler = () => {
      const newQuestion: Omit<QuestionType, "id"> = { 
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

   const duplicateQuestionHandler = (event: React.MouseEvent<HTMLButtonElement>, field: QuestionType, index: number) => {
      event.stopPropagation();
      const { id, ...fieldData } = field;
      const duplicatedQuestion = { ...fieldData };
      questions.insert(index + 1, duplicatedQuestion);
      form.setValue("activeIndex", index + 1);
   };

   const removeQuestionHandler = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
      event.stopPropagation();
      if (questions.fields.length === 1) {
         return alert("Cannot delete!");
      }
      const activeIndex = form.getValues("activeIndex") as number;
      if ((activeIndex === index && questions.fields.length - 1 === index) || activeIndex > index) {
         form.setValue("activeIndex", activeIndex - 1);
      }
      questions.remove(index);
   };

   return (
      <S.Slides>
         <Box 
            //* 80px: header, 30px: 15+15 padding for parent, 20px: 10+10 padding for root,
            maxHeight="calc(100vh - 80px - 30px - 20px - 55px)" 
            overflow="auto"
            sx={{ "::-webkit-scrollbar": { width: "5px" } }}
            boxShadow= "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
         >
            {controlledQuestions.map((field, index) => (
               <Slide 
                  key={field.id || index} 
                  duplicateQuestionHandler={duplicateQuestionHandler}
                  removeQuestionHandler={removeQuestionHandler}
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