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

export const Slides = styled(Stack)(() => ({
}));

export const Slide = styled(Stack, { shouldForwardProp })<{ $isActive: boolean; }>(({ theme, $isActive }) => ({
   padding: "10px 15px 10px 0",
   backgroundColor: $isActive ? alpha(theme.palette.custom.light, .7) : 'initial',
   cursor: "pointer",
   borderBottom: `1px solid ${theme.palette.secondary.light}`,
   '& .MuiStack-root.slide': {
      border: `2px solid ${$isActive ? alpha(theme.palette.custom.main, .5) : "2px solid rgb(150 147 147 / 10%)"}`
   },
   '&:hover .MuiStack-root.slide': {
      border: `2px solid ${$isActive ? alpha(theme.palette.custom.main, .5) : theme.palette.secondary.light}`
   }
}));

export const Question = styled(Stack)(() => ({
   flex: 1,
}));

export const QuestionSettings = styled(Stack, { shouldForwardProp })<{ $isBelowMd: boolean; }>(({ theme, $isBelowMd }) => ({
   borderRadius: "0 5px 5px 0",
   position: "relative",
   ...(
      $isBelowMd 
         ? {
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            zIndex: 999,
            background: theme.palette.common.white
         }
         : {}
   ),
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

// Quiz Settings Modal
export const QuizSettings = styled(Stack)(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   background: theme.palette.common.white,
   borderRadius: "10px",
   outline: "none",
   minWidth: 900,
   maxHeight: '95vh',
   transition: "min-width 350ms",
   [theme.breakpoints.down("md")]: {
      minWidth: "90%",
   }
}));

export const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
});