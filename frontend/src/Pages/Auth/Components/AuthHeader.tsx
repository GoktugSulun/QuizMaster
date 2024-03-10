import { Stack } from "@mui/material";
import * as S from '../Style/Auth.style';
import { useNavigate, useParams } from "react-router-dom";
import { AuthEnums } from "@/Constants/Enums";

const AuthHeader = () => {
   const { type } = useParams();
   const isLoginActive = type === AuthEnums.LOGIN;
   const isRegisterActive = type === AuthEnums.REGISTER;
   const navigate = useNavigate();

   const navigateToLogin = () => {
      if (type !== AuthEnums.LOGIN) {
         navigate(`/auth/${AuthEnums.LOGIN}`);
      }
   }

   const navigateToRegister = () => {
      if (type !== AuthEnums.REGISTER) {
         navigate(`/auth/${AuthEnums.REGISTER}`);
      }
   }

   return (
      <Stack alignItems="center">
         <Stack
            flexDirection="row"
            justifyContent="center"
            border="1px solid"
            borderColor="secondary.light"
            padding="5px"
            borderRadius="10px"
            bgcolor="custom.light"
         >
            <S.AuthButton 
               disableRipple 
               $isActive={isLoginActive}
               onClick={navigateToLogin}
            >
               LOGIN
            </S.AuthButton>
            <S.AuthButton 
               disableRipple 
               $isActive={isRegisterActive}
               onClick={navigateToRegister}
            >
               REGISTER
            </S.AuthButton>
         </Stack>
      </Stack>
   )
}

export default AuthHeader