import { BaseModal } from "@/Core/Components"
import { useAppSelector, useThunk } from "@/Core/Hooks"
import { useDispatch } from "react-redux";
import { QuizActions } from "../Store/Quiz.slice";
import { useNavigate } from "react-router-dom";
import { RouteEnums } from "@/Constants/Enums";
import { Stack, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const InfoModal = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isOpenInfoModal, quiz, quizResultResponse } = useAppSelector((state) => state.Quiz);
   const { setIdle } = useThunk("completeQuizSession");

   const handleClose = () => {
      setIdle();
      dispatch(QuizActions.setIsOpenInfoModal("CLOSE"));
      navigate(RouteEnums.FEED, { replace: true });
   }

   const navigateToResultPage = () => {
      setIdle();
      dispatch(QuizActions.setIsOpenInfoModal("CLOSE"));
      navigate(
         { 
            pathname: RouteEnums.QUIZ_RESULTS, 
            search: `?quizId=${quiz.id}&resultId=${quizResultResponse.id}` 
         }, 
         { replace: true }
      );
   }

   return (
      <BaseModal
         open={isOpenInfoModal}
         handleClose={handleClose}
         title="CONGRATULATIONS"
         firstButtonName="Explore other quizzes"
         secondButtonName="View the results"
         secondButtonOnClick={navigateToResultPage}
      >
         <Stack sx={{ padding: "25px 0", alignItems: "center" }}>
            <TaskAltIcon sx={{ color: "primary.main", fontSize: "120px" }} />
            <Typography
               color="#5e5e5e"
               textAlign={"center"}
               marginTop={"10px"}
            >
               <Typography 
                  variant="subtitle1" 
                  variantMapping={{ subtitle1: "span" }}
                  display={"inline-block"}
                  margin="0 4px"
                  color={"primary.main"}
                  fontWeight={"bold"}
               > 
                  Congratulations!
               </Typography> 
                You've completed the quiz. You can 
                <Typography 
                  variant="subtitle1" 
                  variantMapping={{ subtitle1: "span" }}
                  display={"inline-block"}
                  margin="0 4px"
                  color={"primary.main"}
                  fontWeight={"bold"}
               > 
                  view your results
               </Typography> 
               using the button below or 
               <Typography 
                  variant="subtitle1" 
                  variantMapping={{ subtitle1: "span" }}
                  display={"inline-block"}
                  margin="0 0 0 4px"
                  color={"primary.main"}
                  fontWeight={"bold"}
               > 
                  return to the homepage
               </Typography>. Feel free to explore other options while you're here!
            </Typography>
         </Stack>
      </BaseModal>
   )
}

export default InfoModal