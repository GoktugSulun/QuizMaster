import { CustomTooltip } from "@/Components/Tooltip";
import { Box, Stack, type Theme, useMediaQuery } from "@mui/material";
import * as S from '../Style/Header.style';
import { useNavigate } from "react-router-dom";
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import { useFormContext } from "react-hook-form";
import CreatorThunks from "@/Pages/Creator/Store/Creator.thunk";
import { type QuestionType } from "@/Pages/Creator/Types/CreatorTypes";
import { useAppDispatch, useAppSelector, useThunk } from "@/Core/Hooks";
import { CreatorActions } from "@/Pages/Creator/Store/Creator.slice";
import SaveIcon from '@mui/icons-material/Save';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const CreatorButtons = () => {
   const navigate = useNavigate();
   const form = useFormContext();
   const questionsInStore = useAppSelector((state) => state.Creator.questions);
   const quizId = useAppSelector((state) => state.Creator.quiz.id);
   const dispatch = useAppDispatch();
   const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

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
         dispatch(CreatorActions.setIsOpenWarningModal("OPEN"))
         return;
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
            <S.EyeButton 
               startIcon={<EyeIcon />}
               sx={{ '& .MuiButton-startIcon': { margin: isBelowSm ? "0px" : "0 8px 0 -4px" } }}
            > 
               { isBelowSm ? "" : "Preview" } 
            </S.EyeButton>
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
            <S.QuitButton 
               onClick={navigateToHome} 
               startIcon={isBelowSm ? <ExitToAppIcon /> : null}
               sx={{ '& .MuiButton-startIcon': { margin: isBelowSm ? "0px" : "0 8px 0 -4px" } }}
            > 
               { isBelowSm ? "" : "Quit" } 
            </S.QuitButton>
         </CustomTooltip>
         <CustomTooltip 
            placement="top"
            arrow 
            title="Save this quiz"
         >
            <S.SaveButton 
               disabled={isLoading} 
               onClick={saveQuizHandler}
               startIcon={isBelowSm ? <SaveIcon /> : null}
               sx={{ '& .MuiButton-startIcon': { margin: isBelowSm ? "0px" : "0 8px 0 -4px" } }}
            > 
               { isBelowSm ? "" : "Save" } 
            </S.SaveButton>
         </CustomTooltip>
      </Stack>
   )
}

export default CreatorButtons