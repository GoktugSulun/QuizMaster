import { PageWrapper } from "@/Core/Layout";
import { Stack, styled } from "@mui/material"; 

export const CreateQuiz = styled(PageWrapper)({
   display: "flex",
   flexDirection: "column",
   padding: "30px 0"
});

export const Slides = styled(Stack)({

});

export const Question = styled(Stack)({
   flex: 1,
});

export const QuestionSettings = styled(Stack)({
});

export const QuizSettings = styled(Stack)({
});