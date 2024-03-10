import { Stack } from "@mui/material";
import * as S from '../Style/Auth.style';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthEnums } from "@/Constants/Enums";

const AuthHeader = () => {
   const { type } = useParams();
   const isLoginActive = type === AuthEnums.LOGIN;
   const isRegisterActive = type === AuthEnums.REGISTER;
   const navigate = useNavigate();
   const location = useLocation();

   const options = {
      state: { 
         authLocation: location.state?.authLocation,
         to: location.state?.to,
         from: location.state?.from
      }, 
      replace: true
   }

   const navigateToLogin = () => {
      if (type !== AuthEnums.LOGIN) {
         navigate(`/auth/${AuthEnums.LOGIN}`, options);
      }
   }

   const navigateToRegister = () => {
      if (type !== AuthEnums.REGISTER) {
         navigate(`/auth/${AuthEnums.REGISTER}`, options);
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