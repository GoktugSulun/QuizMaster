import { CustomTooltip } from "@/Components/Tooltip";
import { TextInput } from "@/Core/Inputs";
import { Button, IconButton, Stack, type Theme, useMediaQuery } from "@mui/material"
import { useState, type KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { snackbar } from "@/Core/Utils";

enum KeyboardEventCode {
   ENTER = 'Enter'
}

const Inputs = () => {
   const form = useFormContext();
   const [showPassword, setShowPassword] = useState(false);
   const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
   const isLoading = false; // todo : dynamic yap servis bağlayınca

   const saveProfile = async () => {
      const isValid = await form.trigger(["name", "surname", "email", "newPassword"]);
      if (!isValid) {
         snackbar("Please fill the required fields!", { variant: "error" });
         return;
      }


      console.log("save => ", form.getValues());
   }

   const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if ((e.key as unknown as KeyboardEventCode) === KeyboardEventCode.ENTER) {
         saveProfile();
      }
   }

   return (
      <Stack
         flex={"1"}
         gap={"25px"}
      >
         <TextInput
            placeholder="Your name"
            shrink
            label="Name*"
            control={form.control}
            name="name"
            disabled={isLoading}
            onKeyDown={onKeyDownHandler}
         />
         <TextInput
            placeholder="Your surname"
            shrink
            label="Surname*"
            control={form.control}
            name="surname"
            disabled={isLoading}
            onKeyDown={onKeyDownHandler}
         />
         <TextInput
            placeholder="Your email"
            shrink
            label="Email*"
            control={form.control}
            name="email"
            disabled={isLoading}
            onKeyDown={onKeyDownHandler}
         />
         <TextInput
            placeholder="Your new password"
            shrink
            label="New Password"
            control={form.control}
            name="newPassword"
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
         <Button 
            onClick={saveProfile} 
            size="large"
            sx={{ padding: "10px 20px", alignSelf: "center", width: isBelowSm ? "100%" : "50%" }}
         > 
            Save
         </Button>
      </Stack>
   )
}

export default Inputs