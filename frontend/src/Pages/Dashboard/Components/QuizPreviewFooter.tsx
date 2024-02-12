import { Box, Button, Stack } from "@mui/material";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { createSearchParams, useNavigate } from "react-router-dom";

type QuizPreviewFooterProps = {
   time: string;
   id: number;
}

const QuizPreviewFooter = ({ time, id }: QuizPreviewFooterProps) => { 
   const navigate = useNavigate();

   const navigateHandler = () => {
      const searchParams = createSearchParams({ id: `${id}` });
      navigate({ pathname: '/rules/quiz', search: `?${searchParams}` });
   };

   return (
      <Stack 
         padding="0 20px 15px" 
         flexDirection="row" 
         justifyContent="space-between"
         gap={1}
         flexWrap="wrap"
      > 
         <Box 
            color="#5e5e5e"
            bgcolor="#ececec"
            borderRadius={2}
            padding="5px 10px"
         > 
            <Stack 
               height="100%" 
               flexDirection="row" 
               alignItems="center" 
               gap={1}
            >
               <AccessAlarmsIcon />
               {time}
            </Stack>
         </Box>
         <Button 
            onClick={navigateHandler} 
            sx={{ padding: "5px 30px" }} 
         > 
            START 
         </Button> 
      </Stack>
   )
}

export default QuizPreviewFooter;