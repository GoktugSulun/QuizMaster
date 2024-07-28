import { PageContent, PageWrapper } from "@/Core/Layout";
import { Button, styled } from "@mui/material";
import { shouldForwardProp } from "@/Core/Utils";

export const Quiz = styled(PageWrapper)({});

export const QuizContent = styled(PageContent)(() => ({
   display: 'flex',
   flexDirection: 'column',
   position: 'relative'
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