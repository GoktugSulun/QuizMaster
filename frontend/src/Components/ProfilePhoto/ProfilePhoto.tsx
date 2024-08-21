import { Typography } from "@mui/material";
import { StyledProfilePhoto } from "./Style/ProfilePhoto.style";
import { useEffect, useState } from "react";

type ProfilePhotoProps = {
   image: File | string;
   name: string;
   surname?: string;
}

const ProfilePhoto = (props: ProfilePhotoProps) => {
   const [imageURL, setImageURL] = useState("");

   useEffect(() => {
      if (props.image) {
         const blobURL = (typeof props.image == "object" && props.image !== null) ? URL.createObjectURL(props.image) : "";
         const imageURL = (blobURL || props.image) as string; 
         setImageURL(imageURL);
   
         return () => {
            URL.revokeObjectURL(imageURL)
         }
      } else {
         setImageURL("")
      }
   }, [props.image])

   if (props.image) {
      return (
         <StyledProfilePhoto>
            <img src={imageURL} />
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