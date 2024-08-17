import { snackbar } from "@/Core/Utils";
import { EditQuizType, type QuizType } from "@/Pages/Creator/Types/CreatorTypes";
import CreatorThunks from "@/Pages/Creator/Store/Creator.thunk";
import { Button, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { DefaultValuesType } from "../QuizSettings";
import { useAppDispatch, useAppSelector, useThunk } from "@/Core/Hooks";
import { Loading } from "@/Core/Components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreatorActions } from "@/Pages/Creator/Store/Creator.slice";

type FooterProps = {
   handleClose: () => void
}

const Footer = (props: FooterProps) => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const form = useFormContext();
   const quizId = useAppSelector((state) => state.Creator.quiz.id);
   const quizImage = useAppSelector((state) => state.Creator.quiz.image);
   const isEditing = !!quizId;

   const { isLoading, isSuccess, setIdle } = useThunk('createQuiz');
   const { 
      isLoading: isLoadingEditingQuiz, 
      isSuccess: isSuccessEditingQuiz, 
      setIdle: setIdleEditingQuiz 
   } = useThunk('editQuiz');
   
   const saveQuizSettings = async () => {
      const isValid = await form.trigger();
      if (!isValid) {
         return snackbar("Please fill in the required fields!", { variant: "error" });
      }
      const { minute, second, image, ...data } = form.getValues() as DefaultValuesType;
      const payload = {
         ...data,
         totalTime: minute!.id * 60 + second!.id
      } as QuizType;

      const newFile = typeof image == 'object' && image !== null ? image as File : null;
      const imageData = newFile ? newFile.name : image as string;
      
      //* Edit an existing quiz
      if (isEditing) {
         const editPayload = {
            ...payload, 
            image: imageData, 
            id: quizId
         } as EditQuizType

         const [, uuid] = quizImage?.split("_") || [];
         if (uuid) {
            if (newFile) {
               editPayload.isRemovedImage = false; //* Change existing file
            } else {
               editPayload.isRemovedImage = true; //* Remove existing file
            }
         } else {
            editPayload.isRemovedImage = false; //* Add a new file or continue with default file
         }
         
         CreatorThunks.editQuiz(editPayload, newFile);
         return;
      }

      //* Create a new quiz
      CreatorThunks.createQuiz({ ...payload, image: imageData }, newFile);
   };

   useEffect(() => {
      if (isSuccess) {
         setIdle();
         dispatch(CreatorActions.setIsOpenQuizSettingsModal("CLOSE"));
         navigate(`/creator/${quizId}`, { replace: true });
      }
   }, [isSuccess]);

   useEffect(() => {
      if (isSuccessEditingQuiz) {
         setIdleEditingQuiz();
         dispatch(CreatorActions.setIsOpenQuizSettingsModal("CLOSE"));
      }
   }, [isSuccessEditingQuiz]);

   return (
      <Stack 
         flexDirection="row" 
         justifyContent="center" 
         gap="10px"
         padding="25px"
      >
         <Button
            sx={{
               flex: { xs: 1, md: 'initial' },
               width: 100,
               bgcolor: "secondary.light",
               color: "common.black",
               boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
               '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  color: "common.black",
               }
            }}
            onClick={props.handleClose}
            disabled={isLoading || isLoadingEditingQuiz}
         > 
            Cancel 
         </Button>
         <Button
            sx={{ 
               flex: { xs: 1, md: 'initial' },
               width: 150,
               fontSize: 18
            }}
            onClick={saveQuizSettings}
            disabled={isLoading || isLoadingEditingQuiz}
         > 
            { (isLoading || isLoadingEditingQuiz) ? <Loading size={25} color="#FFFFFF" /> : "Save" } 
         </Button>
      </Stack>
   )
}

export default Footer