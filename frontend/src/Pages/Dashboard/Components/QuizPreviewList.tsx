import { Box, type Theme, useMediaQuery } from "@mui/material";
import QuizPreview from './QuizPreview';
import { useAppSelector } from '@/Core/Hooks';
import { useIntersectionObserver } from "@/Hooks";
import { useEffect } from "react";

type QuizPreviewListProps = {
  getQuizzesHandler: ({ newPage }?: { newPage?: number }) => void
}

const QuizPreviewList = ({ getQuizzesHandler } : QuizPreviewListProps) => {
  const quizzes = useAppSelector((state) => state.Dashboard.quizzes);
  const canBeMoreQuiz = useAppSelector((state) => state.Dashboard.canBeMoreQuiz); 
  const isBelowLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const isBelowMd= useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const minWidth = isBelowMd ? "250px" : isBelowLg ? "300px" : "350px";  

  const { ref, isIntersecting } = useIntersectionObserver({ dependencies: [quizzes.length], triggerOnce: true });

  useEffect(() => {
    if (isIntersecting) {
      getQuizzesHandler();
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