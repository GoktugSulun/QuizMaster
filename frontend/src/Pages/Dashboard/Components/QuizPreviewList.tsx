import { Box, type Theme, useMediaQuery } from "@mui/material";
import QuizPreview from './QuizPreview';
import { useAppSelector } from '@/Core/Hooks';

const QuizPreviewList = () => {
  const quizzes = useAppSelector((state) => state.Dashboard.quizzes);
  const isBelowLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const isBelowMd= useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const minWidth = isBelowMd ? "250px" : isBelowLg ? "300px" : "350px";  

  return (
    <Box
      display="grid"
      gap="40px"
      gridTemplateColumns={`repeat(auto-fit, minmax(${minWidth}, 1fr))}`}
    >
      {
        quizzes.map((quiz) => (
          <QuizPreview key={quiz.id} data={quiz} />
        ))
      }
    </Box>
  );
}

export default QuizPreviewList;