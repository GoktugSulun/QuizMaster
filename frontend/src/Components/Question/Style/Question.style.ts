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

type OptionBoxProps = { 
   $bgColor?: string; 
   $color?: string; 
   $fontWeight?: string;
   cursor?: string; 
   size?: "small" | "medium" | "large"
}

const optionBoxSizeMap = {
   small: "25px",
   medium: "40px 25px",
   large: "60px 30px"
}

export const OptionBox = styled(Box, { shouldForwardProp })<OptionBoxProps>(({ theme, size="medium", ...props }) => ({
   background: props.$bgColor || theme.palette.common.white,
   width: '100%',
   padding: optionBoxSizeMap[size],
   borderRadius: 15,
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
   '& .MuiTypography-root, & .MuiOutlinedInput-input': {
      color: props.$color || theme.palette.common.black,
      fontWeight: props.$fontWeight || 'normal',
   },
   '& .MuiTypography-root': {
      cursor: props.cursor || 'initial',
   },
   '& .MuiRadio-root': {
      cursor: props.cursor || 'initial',
      '&.Mui-checked': {
         color: props.$color || theme.palette.common.black,
      }
   }
}));