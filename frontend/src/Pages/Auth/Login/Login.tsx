import { useForm } from 'react-hook-form';
import * as S from '../Style/Auth.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextInput } from '@/Core/Inputs';
import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { snackbar } from '@/Core/Utils';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CustomTooltip } from '@/Components/Tooltip';

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
   const [showPassword, setShowPassword] = useState(false);
   const form = useForm<DefaultValuesType>({ defaultValues, resolver: yupResolver(schema), mode: "onChange" });

   const loginHandler = async () => {
      const isValid = await form.trigger();
      if (!isValid) {
         snackbar("Please fill all the required fields!", { variant: "error" });
         return;
      }
      console.log(form.getValues(), ' data');
   };
   
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
            />
            <TextInput
               placeholder="Your password"
               shrink
               label="Password"
               control={form.control}
               name="password"
               type={showPassword ? "text" : "password"}
               endAdornment={
                  <CustomTooltip arrow title={showPassword ? "Hide" : "Show"} placement="top">
                     <IconButton onClick={() => setShowPassword((prev) => !prev)}> 
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
            > 
               Login 
            </Button>
         </Stack>
      </S.Login>
   )
}

export default Login