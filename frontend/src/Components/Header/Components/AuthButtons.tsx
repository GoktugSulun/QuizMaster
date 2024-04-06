import { Button, Stack } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

const AuthButtons = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const navigateToLogin = () => {
      navigate("/auth/login", { state: { authLocation: location } });
   }

   const navigateToRegister = () => {
      navigate("/auth/register", { state: { authLocation: location } });
   }

   return (
      <Stack 
         flexDirection="row" 
         alignItems="center" 
         gap="10px"
      >
         <Button sx={{ fontSize: 16 }} onClick={navigateToLogin}> Login </Button>
         <Button sx={{ fontSize: 16 }} onClick={navigateToRegister}> Register </Button>
      </Stack>
   )
}

export default AuthButtons