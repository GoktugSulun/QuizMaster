import { Box, type Theme, useMediaQuery } from "@mui/material";
import QuizPreview from './QuizPreview';
import { useAppSelector } from '@/Core/Hooks';
import { useIntersectionObserver } from "@/Hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DashboardActions } from "../Store/Dashboard.slice";

const QuizPreviewList = () => {
  const dispatch = useDispatch();
  const quizzes = useAppSelector((state) => state.Dashboard.quizzes);
  const canBeMoreQuiz = useAppSelector((state) => state.Dashboard.canBeMoreQuiz); 
  const page = useAppSelector((state) => state.Dashboard.page); 
  const isBelowLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const isBelowMd= useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const minWidth = isBelowMd ? "250px" : isBelowLg ? "300px" : "350px";  

  const { ref, isIntersecting } = useIntersectionObserver({ dependencies: [quizzes.length], triggerOnce: true });

  useEffect(() => {
    if (isIntersecting) {
      dispatch(DashboardActions.setPage({ newPage: page + 1 }));
    }
 }, [isIntersecting]);

  return (
    <Box
      display="grid"
      gap="40px"
      gridTemplateColumns={`repeat(auto-fit, minmax(${minWidth}, ${quizzes.length < 4 ? "450px" : "1fr"}))}`}
    >
      {
        quizzes.map((quiz, index, arr) => (
          <QuizPreview 
            key={quiz.id} 
            data={quiz}
            ref={(arr.length - 1 === index && canBeMoreQuiz) ? ref : null}
          />
        ))
      }
    </Box>
  );
}

export default QuizPreviewList;