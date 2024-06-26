import { Button, Stack } from "@mui/material"
import { QuizRulesThunks } from "../../Store/QuizRules.thunk";
import { useSearchParams } from "react-router-dom";

type QuizSessionInfoModalFooterProps = {
   handleClose: () => void;
}

const QuizSessionInfoModalFooter = ({ handleClose }: QuizSessionInfoModalFooterProps) => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id") as string;

   const startQuizHandler = () => {
      QuizRulesThunks.startQuiz({ quizId: id });
      handleClose();
   };

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
            onClick={handleClose}
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