import { Divider, Stack, type Theme, useMediaQuery } from "@mui/material";
import { StyledProfile, StyledProfileContent } from "./Style/Profile.style";
import ProfileHeader from "./Components/ProfileHeader";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PhotoUpload from "./Components/PhotoUpload";
import Inputs from "./Components/Inputs";

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
      .transform((value: string) => (value === '' ? undefined : value))
      .min(6, "Password must be minimum 6 characters")
      .nullable()
      .notRequired()
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

   return (
      <StyledProfile>
         <StyledProfileContent $isBelowMd={isBelowMd}>
            <ProfileHeader />
            <Divider sx={{ margin: "20px 0"}} />
            <FormProvider {...form}>
               <Stack
                  flexDirection={isBelowMd ? "column" : "row"}
                  gap={isBelowMd ? "30px" : "60px"}
                  height={"100%"}
                  padding={"50px 0"}
                  width={isBelowLg ? "100%" : "900px"}
                  margin={isBelowLg ? "0" : "0 auto"}
               >
                  <PhotoUpload />
                  <Divider orientation={isBelowMd ? "horizontal" : "vertical"} />
                  <Inputs />
               </Stack>
            </FormProvider>
         </StyledProfileContent>
      </StyledProfile>
   )
}

export default Profile