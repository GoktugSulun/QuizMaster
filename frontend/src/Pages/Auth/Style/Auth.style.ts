import { Button, Stack, styled } from "@mui/material";
import { shouldForwardProp } from "@/Core/Utils";

export const Auth = styled("div")(({ theme }) => ({
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

export const Login = styled("div")(({ theme }) => ({
   
}));

export const Register = styled("div")(({ theme }) => ({
 
}));

export const AuthButton = styled(Button, { shouldForwardProp })<{ $isActive?: boolean; }>(({ theme, $isActive }) => ({
   width: 150,
   background: $isActive ? theme.palette.primary.main : 'inherit',
   color: $isActive ? theme.palette.common.white : theme.palette.primary.main,
   '&:hover': {
      background: $isActive ? theme.palette.primary.main : 'inherit',
      color: $isActive ? theme.palette.common.white : theme.palette.primary.main,
   }
}))