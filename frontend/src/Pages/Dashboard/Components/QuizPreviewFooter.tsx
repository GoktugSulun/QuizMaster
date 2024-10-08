import { Box, Button, Stack, Typography } from "@mui/material";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { formatTime } from "@/Core/Helper";
import useAuth from "@/Hooks/useAuth";

type QuizPreviewFooterProps = {
   id: string;
   totalTime: number;
}

const QuizPreviewFooter = ({ id, totalTime }: QuizPreviewFooterProps) => { 
   const navigate = useNavigate();
   const location = useLocation();
   const { minute, second } = formatTime(totalTime);

   const { isAuthorized } = useAuth();

   const navigateHandler = () => {
      const searchParams = createSearchParams({ id: `${id}` });
      if (isAuthorized) {
         navigate({ pathname: "/rules/quiz", search: `?${searchParams}` });
      } else {
         navigate("/auth/login", { state: { from: location.pathname, to: "/rules/quiz", authLocation: location, search: `?${searchParams}` } });
      }
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
               <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap="5px"
               >
                  <Typography variant="body1"> {minute.name} </Typography>
                  : 
                  <Typography variant="body1"> {second.name} </Typography>
               </Stack>
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