import { Box, Stack, styled } from "@mui/material";
import { shouldForwardProp } from "@/Core/Utils";

export const QuestionHeader = styled(Stack)(({ theme }) => ({
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
   margin: '20px 40px 0',
   borderRadius: 15,
   padding: 20,
}));

export const Time = styled(Stack)(({ theme }) => ({
   borderRadius: 15,
   padding: '10px 15px',
   background: theme.palette.custom.light
}));

export const OptionBox = styled(Box, { shouldForwardProp })<{ $isChecked: boolean }>(({ theme, $isChecked }) => ({
   background: $isChecked ? theme.palette.custom.light : 'initial',
   width: '100%',
   padding: '40px 25px',
   borderRadius: 15,
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
   '& .MuiTypography-root': {
      color: $isChecked ? theme.palette.primary.main : theme.palette.common.black
   }
}));