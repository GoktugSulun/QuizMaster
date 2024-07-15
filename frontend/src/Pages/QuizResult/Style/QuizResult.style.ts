import { PageContent, PageWrapper } from "@/Core/Layout";
import { Box, styled } from "@mui/material";

export const QuizResult = styled(PageWrapper)({
   display: 'flex',
   flexDirection: 'column',
   gap: 50,
});

export const QuizResultContent = styled(PageContent)(() => ({
   display: 'flex',
   flexDirection: 'column',
   minHeight: 'calc(100vh - 80px  - 100px)',
   height: 'auto'
}));

export const Answers = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   minHeight: 'calc(100vh - 80px)',
   height: 'auto',
   gap: 30
}));

export const Question = styled(Box)(({ theme }) => ({
   background: theme.palette.common.white,
   border: `1px solid ${theme.palette.secondary.light}`,
   borderRadius: 15
}));