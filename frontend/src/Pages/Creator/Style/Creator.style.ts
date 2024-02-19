import { PageWrapper } from "@/Core/Layout";
import { Stack, alpha, styled } from "@mui/material"; 
import { shouldForwardProp } from "@/Core/Utils";

export const Creator = styled(PageWrapper)({
   gap: 10,
   padding: "15px 0 0 0",
});


export const CretorHeader = styled(Stack)(({ theme }) => ({
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   gap: "10px",
   background: theme.palette.common.white,
   border: `1px solid ${theme.palette.secondary.light}`, 
   padding: "15px",
   borderRadius: 5,
}));

export const Slides = styled(Stack)(({ theme }) => ({
   borderLeft: `1px solid ${theme.palette.secondary.light}`,
   borderRadius: "5px 0 0 5px",
}));

export const Slide = styled(Stack, { shouldForwardProp })<{ $isActive: boolean; }>(({ theme, $isActive }) => ({
   padding: "10px 15px 10px 0",
   backgroundColor: $isActive ? alpha(theme.palette.custom.light, .7) : 'initial',
   cursor: "pointer",
   '& .MuiStack-root.slide': {
      border: `2px solid ${$isActive ? alpha(theme.palette.custom.main, .5) : "2px solid rgb(150 147 147 / 10%)"}`
   },
   '&:hover .MuiStack-root.slide': {
      border: `2px solid ${$isActive ? alpha(theme.palette.custom.main, .5) : theme.palette.secondary.light}`
   }
}));

export const Question = styled(Stack)(({ theme }) => ({
   flex: 1,
   borderLeft: `1px solid ${theme.palette.secondary.light}`,
   borderRight: `1px solid ${theme.palette.secondary.light}`,
}));

export const QuestionSettings = styled(Stack)(({ theme }) => ({
   borderRadius: "0 5px 5px 0",
   position: "relative",
   '& .MuiIconButton-root.toggle': {
      position: 'absolute',
      top: 140,
      left: -20,
      zIndex: 5,
      background: theme.palette.common.white,
      border: `1px solid ${theme.palette.secondary.light}`,
      '&:hover': {
         background: theme.palette.common.white,
      },
      '& .MuiSvgIcon-root': {
         width: 20,
         height: 20
      }
   }
}));

// Modal
export const QuizSettings = styled(Stack)({
});