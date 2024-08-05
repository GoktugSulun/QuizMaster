import { useForm, useWatch } from 'react-hook-form';
import * as S from '../Style/Auth.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextInput } from '@/Core/Inputs';
import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { snackbar } from '@/Core/Utils';
import { KeyboardEvent, useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CustomTooltip } from '@/Components/Tooltip';
import { useThunk } from '@/Core/Hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loading } from '@/Core/Components';
import AuthThunks from '../Store/Auth.thunk';

type DefaultValuesType = {
   name: string;
   surname: string;
   email: string;
   password: string;
   rpassword: string;
}

const defaultValues: DefaultValuesType = {
   name: "",
   surname: "",
   email: "",
   password: "",
   rpassword: ""
}

const schema = yup.object({
   name: yup
      .string()
      .min(2, "Name must be minimum 2 characters")
      .required("Name is required field!"),
   surname: yup
      .string()
      .min(2, "Surname must be minimum 2 characters")
      .required("Surname is required field!"),
   email: yup
      .string()
      .email("Invalid email format!")
      .required("Email is required field!"),
   password: yup
      .string()
      .required("Password is required field!")
      .min(6, "Password must be minimum 6 characters")
      .test("Are the passwords match", "Passwords don't match", (value, context) => {
         return value === context.parent.rpassword;
      })
}) as yup.ObjectSchema<DefaultValuesType>;

enum KeyboardEventCode {
   ENTER = 'Enter'
}

const Register = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const location = useLocation();
   const [showPassword, setShowPassword] = useState(false);
   const [showRpassword, setShowRpassword] = useState(false);
   const form = useForm<DefaultValuesType>({ defaultValues, resolver: yupResolver(schema), mode: "onChange" });

   const { isLoading, isSuccess, setIdle } = useThunk("register");

   const registerHandler = async () => {
      const isValid = await form.trigger();
      if (!isValid) {
         snackbar("Please fill all the required fields!", { variant: "error" });
         return;
      }
      const { rpassword, ...data } = form.getValues();
      AuthThunks.register(data);
   };

   const triggerPassword = async () => {
      await form.trigger("password");
   }

   const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if ((e.key as unknown as KeyboardEventCode) === KeyboardEventCode.ENTER) {
         registerHandler();
      }
   }

   const rpassword = useWatch({ control: form.control, name: "rpassword" });
   const isErrorPassword = !!form.formState.errors?.password;
   
   useEffect(() => {
      if (rpassword && !!form.getValues("password")) {
         triggerPassword();
      }
   }, [rpassword]);
   
   useEffect(() => {
      if (isSuccess) {
         setIdle();
         navigate("/auth/login", { replace: true, state: location.state });
      }
   }, [isSuccess]);
   
   return (
      <S.Register>
         <Stack 
            gap="25px" 
            margin="20px 0"
            padding="20px" 
            maxHeight="65vh"
            overflow="auto"
         >
            <TextInput
               placeholder="Your name"
               shrink
               label="Name"
               control={form.control}
               name="name"
               disabled={isLoading}
               onKeyDown={onKeyDownHandler}
            />
            <TextInput
               placeholder="Your surname"
               shrink
               label="Surname"
               control={form.control}
               name="surname"
               disabled={isLoading}
               onKeyDown={onKeyDownHandler}
            />
            <TextInput
               placeholder="Your email"
               shrink
               label="Email"
               control={form.control}
               name="email"
               disabled={isLoading}
               onKeyDown={onKeyDownHandler}
            />
            <TextInput
               placeholder="Your password"
               shrink
               label="Password"
               control={form.control}
               name="password"
               type={showPassword ? "text" : "password"}
               disabled={isLoading}
               onKeyDown={onKeyDownHandler}
               endAdornment={
                  <CustomTooltip arrow title={showPassword ? "Hide" : "Show"} placement="top">
                     <IconButton disabled={isLoading} onClick={() => setShowPassword((prev) => !prev)}> 
                        { showPassword ? <VisibilityIcon sx={{ color: "primary.main" }} /> : <VisibilityOffIcon sx={{ color: "primary.main" }} />   } 
                     </IconButton>
                  </CustomTooltip>
               }
            />
            <TextInput
               placeholder="Your rpassword"
               shrink
               label="Rpassword"
               control={form.control}
               name="rpassword"
               type={showRpassword ? "text" : "password"}
               disabled={isLoading}
               onKeyDown={onKeyDownHandler}
               endAdornment={
                  <CustomTooltip arrow title={showRpassword ? "Hide" : "Show"} placement="top">
                     <IconButton disabled={isLoading} onClick={() => setShowRpassword((prev) => !prev)}> 
                        { showRpassword ?  <VisibilityIcon sx={{ color: "primary.main" }} /> : <VisibilityOffIcon sx={{ color: "primary.main" }} /> } 
                     </IconButton>
                  </CustomTooltip>
               }
               error={isErrorPassword}
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
               onClick={registerHandler}
               disabled={isLoading}
            > 
               { isLoading ? <Loading size={25} color={theme.palette.common.white} /> : "Register" }    
            </Button>
         </Stack>
      </S.Register>
   )
}

export default Register