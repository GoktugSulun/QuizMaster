import { Button, Stack } from "@mui/material"
import { QuizRulesThunks } from "../../Store/QuizRules.thunk";
import { useNavigate, useSearchParams } from "react-router-dom";

type QuizSessionInfoModalFooterProps = {
   handleClose: (navigateBack?: boolean) => void;
   isQuizPage?: boolean;
}

const QuizSessionInfoModalFooter = ({ handleClose, isQuizPage }: QuizSessionInfoModalFooterProps) => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id") as string;

   const startQuizHandler = () => {
      if (isQuizPage) {
         navigate(`/quiz?id=${searchParams.get("id")}&question=${1}`, { replace: true })
         window.location.reload();
         handleClose();
      } else {
         QuizRulesThunks.startQuiz({ quizId: id });
         handleClose();
      }
   };

   const cancelHandler = () => {
      handleClose(isQuizPage);
   }

   return (
      <Stack
         marginTop={"20px"}
         flexDirection={"row"}
         alignItems={"center"}
         justifyContent={"center"}
         gap={"15px"}
      >
         <Button
            sx={{
               bgcolor: "secondary.light",
               color: "common.black",
               boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
               '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  color: "common.black",
               }
            }}
            onClick={cancelHandler}
         >
            Cancel
         </Button>
         <Button onClick={startQuizHandler}>
            Start New Quiz Session
         </Button>
      </Stack>
   )
}

export default QuizSessionInfoModalFooter