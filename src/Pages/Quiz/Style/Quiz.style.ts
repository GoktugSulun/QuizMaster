import { PageContent, PageWrapper } from "@/Core/Layout";
import { Box, Button, Stack, styled } from "@mui/material";
import { shouldForwardProp } from "@/Core/Utils";

export const Quiz = styled(PageWrapper)({});

export const QuizContent = styled(PageContent)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column'
}));

export const QuizHeader = styled(Stack)(({ theme }) => ({
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
   margin: '20px 40px 0',
   borderRadius: 15,
   padding: 20,
})); 

export const Time = styled(Stack)(({ theme }) => ({
   borderRadius: 15,
   padding: '10px 15px',
   background: theme.palette.custom.light
}));

export const PaginationDirectionButton = styled(Button)(({ theme }) => ({
   background: theme.palette.custom.light,
   color: theme.palette.primary.main,
   fontWeight: 'bold',
   padding: "6px 25px",
   borderRadius: 10,
   '&:hover': {
      background: theme.palette.custom.light,
   }
}));

export const PaginationButton = styled(Button, { shouldForwardProp })<{ $isSelected: boolean }>(({ theme, $isSelected }) => ({
   background: $isSelected ? theme.palette.primary.main : theme.palette.custom.light,
   color: $isSelected ? theme.palette.custom.light : theme.palette.primary.main ,
   fontWeight: 'bold',
   borderRadius: 10,
   '&:hover': {
      background: $isSelected ? theme.palette.primary.main : theme.palette.custom.light,
   }
}));

export const AnswerBox = styled(Box)(({ theme }) => ({
   // background: theme.palette.custom.light,
   // color: theme.palette.primary.main,
   width: '100%',
   padding: '40px 25px',
   borderRadius: 15,
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
}));