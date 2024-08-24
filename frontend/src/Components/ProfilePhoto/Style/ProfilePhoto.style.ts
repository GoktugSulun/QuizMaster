import { Stack, styled } from "@mui/material";
import { shouldForwardProp } from "@/Core/Utils";

export const StyledProfilePhoto = styled(Stack, { shouldForwardProp })<{ $width?: number; $height?: number; }>(({ theme, $width, $height }) => ({
   width: $width || 200,
   height: $height || 200,
   alignItems: "center",
   justifyContent: "center",
   background: theme.palette.primary.light,
   border: `1px solid ${theme.palette.primary.main}`,
   borderRadius: "50%",
   "& img": {
      borderRadius: "50%",
      width: "100%",
      height: "100%"
   }
}))