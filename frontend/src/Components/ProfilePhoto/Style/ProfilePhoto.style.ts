import { Stack, styled } from "@mui/material";

export const StyledProfilePhoto = styled(Stack)(({ theme }) => ({
   width: 200,
   height: 200,
   alignItems: "center",
   justifyContent: "center",
   background: theme.palette.primary.light,
   borderRadius: "50%",
}))