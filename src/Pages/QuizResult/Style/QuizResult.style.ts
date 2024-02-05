import { PageContent, PageWrapper } from "@/Core/Layout";
import { styled } from "@mui/material";

export const QuizResult = styled(PageWrapper)({
   display: 'flex',
   flexDirection: 'column',
   gap: 50,
});

export const QuizResultContent = styled(PageContent)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   minHeight: 'calc(100vh - 80px  - 100px)',
}));

export const Answers = styled(PageContent)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   minHeight: 'calc(100vh - 80px)',
}));