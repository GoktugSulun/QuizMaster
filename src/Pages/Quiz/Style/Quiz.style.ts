import { PageContent, PageWrapper } from "@/Core/Layout";
import { Box, Stack, styled } from "@mui/material";

export const Quiz = styled(PageWrapper)({});

export const QuizContent = styled(PageContent)(({ theme }) => ({

}));

export const QuizHeader = styled(Stack)(({ theme }) => ({
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
   margin: '10px 20px',
   borderRadius: 15,
   padding: 20
})); 

export const Time = styled(Stack)(({ theme }) => ({
   borderRadius: 15,
   padding: '10px 15px',
   background: theme.palette.custom.light,
   // border: `1px solid ${theme.palette.secondary.light}`,
}));