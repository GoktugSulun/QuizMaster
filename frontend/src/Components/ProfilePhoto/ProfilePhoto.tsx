import { Typography } from "@mui/material";
import { StyledProfilePhoto } from "./Style/ProfilePhoto.style";

type ProfilePhotoProps = {
   image: File | string;
   name: string;
   surname?: string;
}

const ProfilePhoto = (props: ProfilePhotoProps) => {

   if (props.image) {
      return (
         <StyledProfilePhoto>
            İmage
         </StyledProfilePhoto>
      )
   }

   return (
      <StyledProfilePhoto>
         <Typography 
            color={"primary.main"} 
            fontWeight={"bold"} 
            fontSize={"60px"} 
         >
            { props.name.charAt(0).toLocaleUpperCase() }
            { props.surname ? props.surname.charAt(0).toLocaleUpperCase() : "" }
         </Typography>
      </StyledProfilePhoto>
   )
}

export default ProfilePhoto