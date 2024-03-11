import { useForm } from 'react-hook-form';
import * as S from '../Style/Auth.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextInput } from '@/Core/Inputs';
import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { snackbar } from '@/Core/Utils';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CustomTooltip } from '@/Components/Tooltip';
import { useThunk } from '@/Core/Hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteEnums } from '@/Constants/Enums';
import { Loading } from '@/Core/Components';

type DefaultValuesType = {
   email: string;
   password: string;
}

const defaultValues: DefaultValuesType = {
   email: "",
   password: "",
}

const schema = yup.object({
   email: yup
      .string()
      .email("Invalid email format!")
      .required("Email is required field!"),
   password: yup
      .string()
      .required("Password is required field!")
      .min(6, "Password must be minimum 6 characters")
}) as yup.ObjectSchema<DefaultValuesType>;;

const Login = () => {
   const theme = useTheme();
   const location = useLocation();
   const navigate = useNavigate();
   const form = useForm<DefaultValuesType>({ defaultValues, resolver: yupResolver(schema), mode: "onChange" });
   const [showPassword, setShowPassword] = useState(false);

   const { isLoading, isSuccess, setIdle } = useThunk("login");

   const loginHandler = async () => {
      const isValid = await form.trigger();
      if (!isValid) {
         snackbar("Please fill all the required fields!", { variant: "error" });
         return;
      }
      console.log(form.getValues(), ' data');
   };

   useEffect(() => {
      if (isSuccess) {
         setIdle();
         const to = location.state?.to;
         const from = location.state?.from;
         if (to) {
            navigate(to, { replace: true });
            return;
         }
         if (from) {
            navigate(from, { replace: true });
            return;
         }
         navigate(RouteEnums.FEED);
      }
   }, [isSuccess]);
   
   return (
      <S.Login>
         <Stack 
            gap="25px" 
            margin="20px 0"
            padding="20px" 
            maxHeight="65vh"
            overflow="auto"
         >
            <TextInput
               placeholder="Your email"
               shrink
               label="Email"
               control={form.control}
               name="email"
               disabled={isLoading}
            />
            <TextInput
               placeholder="Your password"
               shrink
               label="Password"
               control={form.control}
               name="password"
               type={showPassword ? "text" : "password"}
               disabled={isLoading}
               endAdornment={
                  <CustomTooltip arrow title={showPassword ? "Hide" : "Show"} placement="top">
                     <IconButton disabled={isLoading} onClick={() => setShowPassword((prev) => !prev)}> 
                        { showPassword ? <VisibilityIcon sx={{ color: "primary.main" }} /> : <VisibilityOffIcon sx={{ color: "primary.main" }} />   } 
                     </IconButton>
                  </CustomTooltip>
               }
            />
         </Stack>
         <Stack alignItems="center">
            <Button 
               sx={{ 
                  width: "50%", 
                  fontSize: "18px",
                  [theme.breakpoints.down("sm")]: {
                     width: "100%"
                  } 
               }}
               onClick={loginHandler}
               disabled={isLoading}
            > 
              { isLoading ? <Loading size={25} color={theme.palette.common.white} /> : "Login" }
            </Button>
         </Stack>
      </S.Login>
   )
}

export default Login