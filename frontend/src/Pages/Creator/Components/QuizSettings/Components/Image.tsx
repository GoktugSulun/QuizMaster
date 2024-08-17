
import { useFormContext, useWatch } from "react-hook-form";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import * as S from '../../../Style/Creator.style';
import { useEffect, useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomTooltip } from "@/Components/Tooltip";
import { ImageCropperModal } from "../../CropImageModal";

const Image = () => {
   const form = useFormContext();
   const [openImageCropper, setOpenImageCropper] = useState(false);
   const image = useWatch({ control: form.control, name: "image" });
   const blobURL = (typeof image == "object" && image !== null) ? URL.createObjectURL(image) : "";
   const imageURL = blobURL || image || "http://localhost:8000/default.png";
   
   const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files?.[0];
      if (image) {
         form.setValue("image", image);
         setOpenImageCropper(true);
      }
   }

   const deleteImage = () => {
      form.setValue("image", null);
   }

   const isDefaultImage = () => {
      if (blobURL) {
         return false;
      }
      return imageURL.includes("default.png");
   }

   useEffect(() => { 
      return () => URL.revokeObjectURL(blobURL);
   }, []);

   return (
      <Box alignSelf={{ xs: "center" }}>
         <Typography 
            fontSize={18} 
            variant="h6"
            color="primary.main"
         >
            Cover Photo
         </Typography>
         <Box 
            position="relative"
            width={300}
            height={200}
            borderRadius="10px"
            border="1px solid"
            borderColor="secondary.light"
            boxSizing={"content-box"}
         > 
            <img 
               width="100%" 
               height="100%" 
               style={{ borderRadius: 'inherit', objectFit: "contain", objectPosition: "center" }}
               src={imageURL} 
            />
            <Stack 
               position="absolute"
               bottom="10px"
               left="0"
               width="100%"
               flexDirection="row"
               justifyContent={!isDefaultImage() ? "space-between" : "center"}
               alignItems="centeer"
               zIndex={20}
               padding="0 10px 0 5px"
               sx={{ filter: "drop-shadow(2px 2px 6px #222)" }}
            >  
               {
                  !isDefaultImage() && (
                     <Stack 
                        flexDirection="row" 
                        alignItems="center"
                        gap="10px"
                     >
                        <CustomTooltip arrow title="Delete">
                           <IconButton
                              sx={{ 
                                 backgroundColor: "error.main",
                                 '&:hover': { backgroundColor: "error.dark" },
                              }}
                              onClick={deleteImage} 
                           >
                              <DeleteIcon sx={{ color: "common.white" }} />
                           </IconButton>
                        </CustomTooltip>
                        <ImageCropperModal image={image} openState={[openImageCropper, setOpenImageCropper]} />
                     </Stack>
                  )
               }
               <CustomTooltip arrow title="Change">
                  <Button
                     component="label"
                     tabIndex={-1}
                     startIcon={<ImageIcon />}
                  >
                     Change
                     <S.VisuallyHiddenInput accept="image/*" onChange={onImageChange} type="file" />
                  </Button>
               </CustomTooltip>
            </Stack> 
         </Box>
      </Box>
   )
}

export default Image