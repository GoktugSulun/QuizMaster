import { IconButton, Stack, Typography, useTheme } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from "@/Core/Hooks";
import { QuizStatusEnums } from "@/Constants/Enums";

type QuizSessionInfoModalHeader = {
   handleClose: (navigateBack?: boolean) => void;
   isQuizPage?: boolean;
}

const QuizSessionInfoModalHeader = ({ isQuizPage, handleClose }: QuizSessionInfoModalHeader) => {
   const theme = useTheme();
   const startQuizResponse = useAppSelector((state) => state.QuizRules.startQuizResponse);

   return (
      <Stack
         flexDirection={"row"}
         alignItems={"center"}
         justifyContent={"space-between"}
      >
         <Typography 
            variant="h6" 
            color={theme.palette.primary.main}
            fontWeight={"bold"}
         > 
            { startQuizResponse?.status === QuizStatusEnums.EXCEED_ATTEMPT && "EXCEED ATTEMPT" } 
            { startQuizResponse?.status === QuizStatusEnums.TIMEOUT && "TIMEOUT" } 
         </Typography>
         <IconButton 
            sx={{ 
               backgroundColor: "custom.light",
               '&:hover': { backgroundColor: "primary.main" },
               '&:hover .MuiSvgIcon-root': { color: "common.white" } 
            }} 
            onClick={() => handleClose(isQuizPage)}
         >
            <CloseIcon sx={{ color: "primary.main" }} />
         </IconButton>
      </Stack>
   )
}

export default QuizSessionInfoModalHeader