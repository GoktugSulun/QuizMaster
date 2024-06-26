import { Stack, Typography } from '@mui/material'
import { useAppSelector } from '@/Core/Hooks';
import { QuizStatusEnums } from '@/Constants/Enums';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const QuizSessionInfoModalBody = () => {
   const startQuizResponse = useAppSelector((state) => state.QuizRules.startQuizResponse);
   
   return (
      <Stack
         padding={"20px 0"}
         justifyContent={"center"}
         alignItems={"center"}
         gap={"10px"}
      >
         <Typography
            color="#5e5e5e"
            textAlign={"center"}
         >
            The quiz you began on 
            <Typography 
               variant="subtitle1" 
               variantMapping={{ subtitle1: "span" }}
               display={"inline-block"}
               margin="0 4px"
               color={"primary.main"}
               fontWeight={"bold"}
            > 
               12th February 2024 
            </Typography> 
            at 
            <Typography 
               variant="subtitle1" 
               variantMapping={{ subtitle1: "span" }}
               display={"inline-block"}
               margin="0 4px"
               color={"primary.main"}
               fontWeight={"bold"}
            > 
               6:30 PM
            </Typography> 
            { startQuizResponse?.status === QuizStatusEnums.TIMEOUT && 'has expired.' }
            { startQuizResponse?.status === QuizStatusEnums.EXCEED_ATTEMPT && 'has exceeded the allowed number of attempts.' }
             Unfortunately, you can no longer continue with this quiz. If you wish to start a new quiz session, please click the 
            <Typography 
               variant="subtitle1" 
               variantMapping={{ subtitle1: "span" }}
               display={"inline-block"}
               margin="0 4px"
               color={"primary.main"}
               fontWeight={"bold"}
            > 
               "Start New Quiz Session"
            </Typography>
            button.
         </Typography>
         { startQuizResponse?.status === QuizStatusEnums.TIMEOUT && <HourglassBottomIcon sx={{ color: "primary.main", fontSize: "120px" }} /> }
         { startQuizResponse?.status === QuizStatusEnums.EXCEED_ATTEMPT && <DoNotDisturbAltIcon sx={{ color: "primary.main", fontSize: "120px" }} /> }
      </Stack>
   )
}

export default QuizSessionInfoModalBody