import { PageContent, PageWrapper } from "@/Core/Layout";
import { styled } from "@mui/material";
import { shouldForwardProp } from "@/Core/Utils";

export const QuizRules = styled(PageWrapper)({});

export const QuizRulesContent = styled(PageContent, { shouldForwardProp })<{$isBelowSm: boolean}>(({ $isBelowSm }) => ({
   display: 'flex',
   flexDirection: 'column',
   padding: $isBelowSm ? "25px" : '25px 50px',
   position: 'relative',
}));

export const Image = styled('img')({
   objectFit: 'cover',
   borderRadius: 10,
   width: "100%",
   maxWidth: 500,
   aspectRatio: 3 / 2
});

export const StyledQuizSessionInfoModal = styled('div')(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   background: theme.palette.common.white,
   borderRadius: "10px",
   minWidth: "600px",
   padding: "20px 30px",
   outline: "none",
   transition: "min-width 350ms",
   [theme.breakpoints.down("sm")]: {
      minWidth: "90%",
   }
}));