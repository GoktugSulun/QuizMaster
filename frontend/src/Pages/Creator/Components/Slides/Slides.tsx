import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../../Style/Creator.style';
import Slide from './Components/Slide';
import { Button, Stack, type Theme, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CorrectOptionEnums, PointEnums, QuestionEnums, type QuestionType } from '../../Types/CreatorTypes';
import { useAppSelector } from '@/Core/Hooks';
import { snackbar } from '@/Core/Utils';
import { CustomTooltip } from '@/Components/Tooltip';

const Slides = () => {
   const form = useFormContext();
   const theme = useTheme();
   const quizId = useAppSelector((state) => state.Creator.quiz.id);
   const isBelowMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

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
         quizId,
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
      const duplicatedQuestion = { ...field };
      questions.insert(index + 1, duplicatedQuestion);
      form.setValue("activeIndex", index + 1);
   };

   const removeQuestionHandler = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
      event.stopPropagation();
      if (controlledQuestions.length === 1) {
         return snackbar("The quiz must have at least one question!", { variant: "error" });
      }
      const activeIndex = form.getValues("activeIndex") as number;
      if ((activeIndex === index && controlledQuestions.length - 1 === index) || activeIndex > index) {
         form.setValue("activeIndex", activeIndex - 1);
      }
      questions.remove(index);
   };

   return (
      <S.Slides 
         flexDirection={isBelowMd ? "row" : "column"}
         sx={{ borderTop: isBelowMd ? `1px solid ${theme.palette.secondary.light}` : "none" }}
      >
         <Stack 
            //* 80px: header, 30px: 15+15 padding for parent, 20px: 10+10 padding for root,
            maxHeight="calc(100vh - 80px - 30px - 20px - 55px)"
            maxWidth="calc(100vw - 100px)"
            overflow="auto"
            sx={{ "::-webkit-scrollbar": { width: "5px" } }}
            boxShadow= "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
            flexDirection={isBelowMd ? "row" : "column"}
         >
            {controlledQuestions.map((field, index) => (
               <Slide 
                  key={`${field.name}-${index}` || index} 
                  duplicateQuestionHandler={duplicateQuestionHandler}
                  removeQuestionHandler={removeQuestionHandler}
                  field={field as QuestionType} 
                  index={index} 
               />
            ))}
         </Stack>
         <Stack 
            alignItems={isBelowMd ? "stretch" : "center" }
            justifyContent="center"
            marginTop={isBelowMd ? "0px" : "10px"}
            marginLeft={isBelowMd ? "10px" : "0px"}
            height={isBelowMd ? "auto" : "50px"}
         >
            <CustomTooltip arrow title="Add Question">
               <Button 
                  sx={{ 
                     height: isBelowMd ? "100%" : "auto", 
                     width: isBelowMd ? "50px" : "auto",
                     '& .MuiButton-startIcon': {
                        margin: isBelowMd ? 0 : "0 7px 0 -4px"
                     }
                  }} 
                  onClick={addQuestionHandler} 
                  startIcon={<AddIcon />}
               >
                  {isBelowMd ? "" : "Add Question"} 
               </Button>
            </CustomTooltip>
         </Stack>
      </S.Slides>
   )
}

export default Slides