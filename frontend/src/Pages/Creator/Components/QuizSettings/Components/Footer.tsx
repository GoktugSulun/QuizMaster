import { snackbar } from "@/Core/Utils";
import { type QuizType } from "@/Pages/Creator/Model/Creator.model";
import CreatorThunks from "@/Pages/Creator/Store/Creator.thunk";
import { Button, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { DefaultValuesType } from "../QuizSettings";
import { useAppSelector, useThunk } from "@/Core/Hooks";
import { Loading } from "@/Core/Components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type FooterProps = {
   handleClose: () => void
}

const Footer = (props: FooterProps) => {
   const navigate = useNavigate();
   const form = useFormContext();
   const quizId = useAppSelector((state) => state.Creator.quiz.id);

   const { isLoading, isSuccess, setIdle } = useThunk('createQuiz');
   console.log(isSuccess, ' issucess');
   

   const saveQuizSettings = async () => {
      const isValid = await form.trigger();
      if (!isValid) {
         return snackbar("Please fill in the required fields!", { variant: "error" });
      }
      const { minute, second, ...data } = form.getValues() as DefaultValuesType;
      const payload = {
         ...data,
         totalTime: minute!.id * 60 + second!.id
      } as QuizType;
      CreatorThunks.createQuiz(payload);
   };

   useEffect(() => {
      if (quizId) {
         setIdle();
         navigate(`/creator/${quizId}`);
      }
   }, [isSuccess, quizId]);

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
            disabled={isLoading}
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
            disabled={isLoading}
         > 
            { isLoading ? <Loading size={20} color="#FFFFFF" /> : "Save" } 
         </Button>
      </Stack>
   )
}

export default Footer