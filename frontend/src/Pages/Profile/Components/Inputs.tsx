import { CustomTooltip } from "@/Components/Tooltip";
import { TextInput } from "@/Core/Inputs";
import { Button, FormControlLabel, IconButton, Stack, Switch, type Theme, useMediaQuery } from "@mui/material"
import { type Dispatch, type SetStateAction, useState, type KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { snackbar } from "@/Core/Utils";
import { type UserPayloadType } from "../Types/ProfileTypes";
import ProfileThunks from "../Store/Profile.thunk";
import useAuth from "@/Hooks/useAuth";

enum KeyboardEventCode {
   ENTER = 'Enter'
}

type InputsProps = {
   changePasswordFlag: boolean;
   setChangePasswordFlag: Dispatch<SetStateAction<boolean>>
}

const Inputs = (props: InputsProps) => {
   const form = useFormContext();
   const [showPassword, setShowPassword] = useState(false);
   const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
   const { authorizedUser } = useAuth();
   
   const { changePasswordFlag, setChangePasswordFlag } = props;

   const saveProfile = async () => {
      const triggerFields = ["name", "surname", "email"];
      if (changePasswordFlag) {
         triggerFields.push("newPassword")
      }
      const isValid = await form.trigger(triggerFields);
      if (!isValid) {
         snackbar("Please fill the required fields!", { variant: "error" });
         return;
      }

      const image = form.getValues("image");
      const newFile = typeof image == 'object' && image !== null ? image as File : null;
      const imageData = newFile ? newFile.name : image as string;

      const data: UserPayloadType = {
         name: form.getValues("name"),
         surname: form.getValues("surname"),
         email: form.getValues("email"),
         image: imageData,
         isRemovedImage: false,
         ...(form.getValues("newPassword") && { newPassword: form.getValues("newPassword") })
      };

      const [, uuid] = authorizedUser.image?.split?.("_") || [];
      if (uuid) {
         if (newFile) {
            data.isRemovedImage = false; //* Change existing file
         } else {
            if (imageData === "") {
               data.isRemovedImage = true; //* Remove existing file
            } else {
               data.isRemovedImage = false; //* Continue with current file
            }
         }
      } else {
         data.isRemovedImage = false; //* Add a new file or continue with no file
      }

      ProfileThunks.saveUserInfo({ payload: data, id: authorizedUser.id, files: newFile })
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
            onKeyDown={onKeyDownHandler}
         />
         <TextInput
            placeholder="Your surname"
            shrink
            label="Surname*"
            control={form.control}
            name="surname"
            onKeyDown={onKeyDownHandler}
         />
         <TextInput
            placeholder="Your email"
            shrink
            label="Email*"
            control={form.control}
            name="email"
            onKeyDown={onKeyDownHandler}
         />
         <FormControlLabel
            control={
               <Switch checked={changePasswordFlag} onChange={() => setChangePasswordFlag(!changePasswordFlag)} />
            } 
            label="Change Password" 
            sx={{ alignSelf: "flex-start" }}
         />
         {
            changePasswordFlag
               && (
                  <TextInput
                     placeholder="Your new password"
                     shrink
                     label="New Password"
                     control={form.control}
                     name="newPassword"
                     type={showPassword ? "text" : "password"}
                     onKeyDown={onKeyDownHandler}
                     helperText="If you want to continue with the current password, please leave this field blank."
                     endAdornment={
                        <CustomTooltip arrow title={showPassword ? "Hide" : "Show"} placement="top">
                           <IconButton onClick={() => setShowPassword((prev) => !prev)}> 
                              { showPassword ? <VisibilityIcon sx={{ color: "primary.main" }} /> : <VisibilityOffIcon sx={{ color: "primary.main" }} />   } 
                           </IconButton>
                        </CustomTooltip>
                     }
                  />
               )
         }
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