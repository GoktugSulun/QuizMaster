import { PageContent, PageWrapper } from "@/Core/Layout";
import { styled } from "@mui/material";

export const QuizRules = styled(PageWrapper)({});

export const QuizRulesContent = styled(PageContent)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column'
}));

export const Image = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   borderRadius: 10
});
