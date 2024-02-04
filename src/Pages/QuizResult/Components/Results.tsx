import { Box, Button, Stack, Typography } from "@mui/material"
import ResultBox from "./ResultBox"

const Results = () => {

   return (
      <Stack flex={1} gap={3} padding="0 30px">
         <ResultBox 
            title="YOUR GRADE"
            text="90"
            items={[
               { id: 1, key: 'Spent Duration:', value: '12:21 min' },
               { id: 2, key: 'Total Duration:', value: '15:00 min' },
               { id: 3, key: 'Completed Date:', value: '04/02/2024' },
            ]}
         />
         <ResultBox 
            title="YOUR ACCURACY"
            text="15 / 20"
            items={[
               { id: 1, key: 'Correct:', value: '15 question' },
               { id: 2, key: 'Wrong:', value: '3 question' },
               { id: 3, key: 'Blank:', value: '2 question' },
            ]}
         />
         <Stack flex={1} justifyContent="center" alignItems="center" gap={3}>
            <Typography textAlign="center" paragraph fontSize="18px"> You can click the button below to find out the answers to the questions you left blank or answered incorrectly.</Typography>
            <Button>
               View Answers
            </Button>
         </Stack>
      </Stack>
   )
}

export default Results