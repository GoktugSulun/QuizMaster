import { Button, Stack, Typography } from "@mui/material";
import ResultOverviewBox from "./ResultOverviewBox";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppSelector } from "@/Core/Hooks";
import { formatDate, formatTime } from "@/Core/Helper";

const Results = () => {
   const { quizResult } = useAppSelector((state) => state.QuizResult);
   const spentDurationInfo = formatTime(quizResult.spentDuration)
   const totalDurationInfo = formatTime(quizResult.totalDuration)
   const completedDateInfo = formatDate(quizResult.completedDate?.toString() || new Date().toString(), ".")

   const viewAnswersHandler = () => {
      const answersEl = document.getElementById("answers");
      if (!answersEl) {
         throw Error("Answers component must has id with 'answers'!");
      }
      answersEl.scrollIntoView();
   };

   return (
      <Stack flex={1} gap={3} padding="0 30px">
         <ResultOverviewBox 
            title="YOUR GRADE"
            text={quizResult.grade}
            items={[
               { id: 1, key: 'Spent Duration:', value: `${spentDurationInfo.minute.name}:${spentDurationInfo.second.name}` },
               { id: 2, key: 'Total Duration:', value: `${totalDurationInfo.minute.name}:${totalDurationInfo.second.name}` },
               { id: 3, key: 'Completed Date:', value: completedDateInfo },
            ]}
         />
         <ResultOverviewBox 
            title="YOUR ACCURACY"
            text={`${quizResult.totalCorrect} / ${quizResult.totalQuestion}`}
            items={[
               { id: 1, key: 'Correct:', value: `${quizResult.totalCorrect} question` },
               { id: 2, key: 'Wrong:', value: `${quizResult.totalWrong} question` },
               { id: 3, key: 'Blank:', value: `${quizResult.totalBlank} question` },
            ]}
         />
         <Stack flex={1} justifyContent="center" alignItems="center" gap={3}>
            <Typography textAlign="center" paragraph fontSize="18px"> You can scroll down or click the button below to find out the answers to the questions you left blank or answered incorrectly.</Typography>
            <Button onClick={viewAnswersHandler} endIcon={<ArrowDownwardIcon />}>
               View Answers
            </Button>
         </Stack>
      </Stack>
   )
}

export default Results