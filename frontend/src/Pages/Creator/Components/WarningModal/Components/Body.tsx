import { Stack, Typography, useTheme } from "@mui/material"
import WarningIcon from '@mui/icons-material/Warning';

const Body = () => {
   const theme = useTheme();

   return (
      <Stack 
         padding={"20px 0"}
         alignItems={"center"}
      >
         <WarningIcon sx={{ color: theme.palette.primary.main, fontSize: "120px" }} />
         <Typography 
            color={"#5e5e5e"} 
            textAlign={"center"}
         >
            Please make sure to create a title, option and correct answer for each question.
         </Typography>
      </Stack>
   )
}

export default Body