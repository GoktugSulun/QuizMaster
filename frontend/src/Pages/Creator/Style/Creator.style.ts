import { PageWrapper } from "@/Core/Layout";
import { Box, Button, Stack, alpha, styled } from "@mui/material"; 

export const CreateQuiz = styled(PageWrapper)({
   display: "flex",
   flexDirection: "column",
   gap: 10,
   padding: "15px 0"
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

export const Slide = styled(Box)<{ $isActive: boolean; }>(({ theme, $isActive }) => ({
   padding: "15px",
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
}));

export const QuestionSettings = styled(Stack)(({ theme }) => ({
   borderRight: `1px solid ${theme.palette.secondary.light}`,
   borderRadius: "0 5px 5px 0"
}));


// Modal
export const QuizSettings = styled(Stack)({
});

export const SaveButton = styled(Button)(({ theme }) => ({
   padding: "5px 30px",
   fontSize: 16,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
}));

export const QuitButton = styled(Button)(({ theme }) => ({
   padding: "5px 20px",
   background: theme.palette.secondary.light,
   color: theme.palette.common.black,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
   '&:hover': {
      background: alpha(theme.palette.secondary.light, 0.1),
   }
}));

export const EyeButton = styled(QuitButton)(({ theme }) => ({
   '& .MuiSvgIcon-root': {
      color: alpha(theme.palette.secondary.light, 0.6),
   }
}));