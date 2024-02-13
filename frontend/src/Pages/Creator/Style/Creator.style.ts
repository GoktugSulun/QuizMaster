import { PageWrapper } from "@/Core/Layout";
import { Button, Stack, alpha, styled } from "@mui/material"; 

export const CreateQuiz = styled(PageWrapper)({
   display: "flex",
   flexDirection: "column",
   padding: "15px 0"
});


export const CretorHeader = styled(Stack)(({ theme }) => ({
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   gap: "10px",
   background: theme.palette.common.white,
   padding: "15px",
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
   borderRadius: 5,
}));

export const Slides = styled(Stack)({

});

export const Question = styled(Stack)({
   flex: 1,
});

export const QuestionSettings = styled(Stack)({
});

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