import { Divider, Stack, type Theme, useMediaQuery } from "@mui/material";
import { StyledProfile, StyledProfileContent } from "./Style/Profile.style";
import ProfileHeader from "./Components/ProfileHeader";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PhotoUpload from "./Components/PhotoUpload";
import Inputs from "./Components/Inputs";
import { useEffect, useState } from "react";
import useAuth from "@/Hooks/useAuth";
import { useThunk } from "@/Core/Hooks";
import { Loading } from "@/Core/Components";
import { snackbar } from "@/Core/Utils";
import AppConfigThunks from "@/Core/Store/AppConfig.thunk";

type DefaultValuesType = {
   name: string;
   surname: string;
   email: string;
   newPassword: string;
   image: File | string;
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
   newPassword: yup
      .string()
      .min(6, "Password must be minimum 6 characters")
      .required("Newpassword is required field!")
}) as yup.ObjectSchema<DefaultValuesType>;

const defaultValues: DefaultValuesType = {
   name: "",
   surname: "",
   email: "",
   newPassword: "",
   image: ""
}

const Profile = () => {
   const form = useForm({ defaultValues, resolver: yupResolver(schema), mode: "onChange" });
   const isBelowMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
   const isBelowLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
   const { authorizedUser } = useAuth();
   
   const [changePasswordFlag, setChangePasswordFlag] = useState<boolean>(false);
   
   const { isLoading, isSuccess, setIdle } = useThunk("saveUserInfo");
   const { isLoading: isLoadingGetUser, isSuccess: isSuccessGetUser, setIdle: setIdleGetUser } = useThunk("getUser");

   const setUser = () => {
      form.reset({
         name: authorizedUser.name,
         surname: authorizedUser.surname,
         email: authorizedUser.email,
         newPassword: "",
         image: authorizedUser.image
      })
   }

   useEffect(() => {
      if (isSuccess) {
         setChangePasswordFlag(false);
         setIdle();
         snackbar("User settings has been saved successfully");
         AppConfigThunks.getUser()
      }
   }, [isSuccess]);

   useEffect(() => {
      if (isSuccessGetUser) {
         setIdleGetUser();
         setUser();
      }
   }, [isSuccessGetUser]);

   useEffect(() => {
      if (authorizedUser.id) {
         setUser();
      }
   }, [authorizedUser.id]);

   return (
      <StyledProfile>
         <StyledProfileContent $isBelowMd={isBelowMd}>
            { (isLoading || isLoadingGetUser) && <Loading blur size={70} /> }
            <ProfileHeader />
            <Divider sx={{ margin: "20px 0"}} />
            <FormProvider {...form}>
               <Stack
                  flexDirection={isBelowMd ? "column" : "row"}
                  gap={isBelowMd ? "30px" : "60px"}
                  height={"100%"}
                  width={"100%"}
                  padding={isBelowMd ? "25px" : "50px 0"}
                  maxWidth={"900px"}
                  margin={isBelowLg ? "0" : "0 auto"}
               >
                  <PhotoUpload />
                  <Divider orientation={isBelowMd ? "horizontal" : "vertical"} />
                  <Inputs changePasswordFlag={changePasswordFlag} setChangePasswordFlag={setChangePasswordFlag} />
               </Stack>
            </FormProvider>
         </StyledProfileContent>
      </StyledProfile>
   )
}

export default Profile