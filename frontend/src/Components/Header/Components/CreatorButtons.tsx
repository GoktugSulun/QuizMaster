import { CustomTooltip } from "@/Components/Tooltip";
import { Box, Stack } from "@mui/material";
import * as S from '../Style/Header.style';
import { useNavigate } from "react-router-dom";
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import { useFormContext } from "react-hook-form";
import CreatorThunks from "@/Pages/Creator/Store/Creator.thunk";
import { type QuestionType } from "@/Pages/Creator/Types/CreatorTypes";
import { useAppSelector, useThunk } from "@/Core/Hooks";
import { Loading } from "@/Core/Components";

const CreatorButtons = () => {
   const navigate = useNavigate();
   const form = useFormContext();

   const { isLoading } = useThunk("createQuestions");

   const navigateToHome = () => {
      navigate('/');
   }

   const validateQuestions = (questions: QuestionType[]) => {
      const isValid = questions.every((question) => 
         question.name                                                  // Must be filled each question name
         && question.options.some((option) => option.isCorrect)         // Must be selected correct option
         && question.options.every((option) => option.name)             // Must be filled each option name
      );
      return isValid;
   }

   const saveQuizHandler = () => {
      // todo : Modal açarsın loading ve başarılı iconu koy
      const questions = form.getValues("questions");
      if (!validateQuestions(questions)) {
         // todo : Güzel bir error mesajı göster, belki eksik slide'lar tespit edilip bir icon çıkartılabilir üzerlerinde
         return alert("Error");
      }

      const questionsInStore = useAppSelector((state) => state.Creator.questions);
      // Edit
      if (questionsInStore.length) {
         const quizId = useAppSelector((state) => state.Creator.quiz.id);
         CreatorThunks.editQuestions({ quizId, questions });
         return;
      }
      // Create
      CreatorThunks.createQuestions(questions);
   }
   
   return (
      <Stack 
         flexDirection="row"
         gap="10px"
      >  
         <CustomTooltip 
            placement="top"
            arrow 
            title="Preview"
         >
            <S.EyeButton startIcon={<EyeIcon />} > Preview </S.EyeButton>
         </CustomTooltip>
         <Box 
            width={2} 
            alignSelf="stretch" 
            bgcolor="secondary.light"
            margin="0 10px"
         />
         <CustomTooltip 
            placement="top"
            arrow 
            title="Quit from creator"
         >
            <S.QuitButton onClick={navigateToHome}> Quit </S.QuitButton>
         </CustomTooltip>
         <CustomTooltip 
            placement="top"
            arrow 
            title="Save this quiz"
         >
            <S.SaveButton disabled={isLoading} onClick={saveQuizHandler}> 
               { isLoading ? <Loading size={25} color="#FFFFFF" /> : "Save"} 
            </S.SaveButton>
         </CustomTooltip>
      </Stack>
   )
}

export default CreatorButtons