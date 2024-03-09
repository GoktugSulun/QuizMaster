import { CustomTooltip } from "@/Components/Tooltip";
import { Box, Stack } from "@mui/material";
import * as S from '../Style/Header.style';
import { useNavigate } from "react-router-dom";
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import { useFormContext } from "react-hook-form";
import CreatorThunks from "@/Pages/Creator/Store/Creator.thunk";
import { type QuestionType } from "@/Pages/Creator/Types/CreatorTypes";
import { useAppDispatch, useAppSelector, useThunk } from "@/Core/Hooks";
import { CreatorActions } from "@/Pages/Creator/Store/Creator.slice";

const CreatorButtons = () => {
   const navigate = useNavigate();
   const form = useFormContext();
   const questionsInStore = useAppSelector((state) => state.Creator.questions);
   const quizId = useAppSelector((state) => state.Creator.quiz.id);
   const dispatch = useAppDispatch();

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
      const questions = form.getValues("questions");
      if (!validateQuestions(questions)) {
         // todo : Güzel bir error mesajı göster, belki eksik slide'lar tespit edilip bir icon çıkartılabilir üzerlerinde
         return alert("Error");
      }

      // Edit
      if (questionsInStore.length) {
         CreatorThunks.editQuestions({ quizId, questions });
         dispatch(CreatorActions.setIsOpenInfoModal("OPEN"));
         return;
      }
      // Create
      CreatorThunks.createQuestions(questions);
      dispatch(CreatorActions.setIsOpenInfoModal("OPEN"));
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
            <S.SaveButton disabled={isLoading} onClick={saveQuizHandler}> Save </S.SaveButton>
         </CustomTooltip>
      </Stack>
   )
}

export default CreatorButtons