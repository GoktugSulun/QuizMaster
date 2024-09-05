import { RouteEnums } from "@/Constants/Enums";
import { PageContent, PageWrapper } from "@/Core/Layout";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
   const theme = useTheme();
   const navigate = useNavigate();

   const navigateToFeed = () => {
      navigate(RouteEnums.FEED, { replace: true });
   }

   return (
      <PageWrapper>
         <PageContent>
            <Stack
               alignItems={"center"}
               justifyContent={"center"}
               height={"100%"}
               gap={"20px"}
            >
               <SentimentVeryDissatisfiedIcon sx={{ color: theme.palette.primary.main, fontSize: "250px" }} />
               <Typography textAlign={"center"} color={"primary.main"}> The page you are looking for could not be found. </Typography>
               <Button onClick={navigateToFeed}> Explore Quizzes </Button>
            </Stack>
         </PageContent>
      </PageWrapper>
   )
}

export default PageNotFound