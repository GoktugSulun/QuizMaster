import { PageWrapper } from "@/Core/Layout";
import { styled } from "@mui/material";

export const QuizRules = styled(PageWrapper)({});

export const QuizRulesContent = styled('div')(({ theme }) => ({
   background: theme.palette.common.white,
   borderRadius: 15,
   height: '100%',
   padding: '25px 50px',
   border: `1px solid ${theme.palette.secondary.light}`,
   display: 'flex',
   flexDirection: 'column'
}));

export const Image = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   borderRadius: 10
});
