import { Button, Stack, Typography } from "@mui/material";
import ResultOverviewBox from "./ResultOverviewBox";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Results = () => {

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
            text="90"
            items={[
               { id: 1, key: 'Spent Duration:', value: '12:21 min' },
               { id: 2, key: 'Total Duration:', value: '15:00 min' },
               { id: 3, key: 'Completed Date:', value: '04/02/2024' },
            ]}
         />
         <ResultOverviewBox 
            title="YOUR ACCURACY"
            text="15 / 20"
            items={[
               { id: 1, key: 'Correct:', value: '15 question' },
               { id: 2, key: 'Wrong:', value: '3 question' },
               { id: 3, key: 'Blank:', value: '2 question' },
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