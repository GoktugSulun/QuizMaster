
import { useFormContext, useWatch } from "react-hook-form";
import CropIcon from '@mui/icons-material/Crop';
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import * as S from '../../../Style/Creator.style';
import { useEffect } from "react";
import DefaultQuizImage from '@/Pngs/DefaultQuizImage.png';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomTooltip } from "@/Components/Tooltip";

const Image = () => {
   const form = useFormContext();

   const image = useWatch({ control: form.control, name: "image" });
   const blobURL = image ? URL.createObjectURL(image) : "";
   console.log(blobURL, ' blob');

   const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files?.[0];
      if (image) {
         form.setValue("image", image);
      }
   }

   const deleteImage = () => {
      form.setValue("image", null);
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
         > 
            <img 
               width="100%" 
               height="100%" 
               style={{ borderRadius: 'inherit', objectFit: "contain", objectPosition: "center" }}
               src={blobURL || DefaultQuizImage} 
            />
            <Stack 
               position="absolute"
               bottom="10px"
               left="0"
               width="100%"
               flexDirection="row"
               justifyContent={blobURL ? "space-between" : "center"}
               alignItems="centeer"
               zIndex={20}
               padding="0 10px 0 5px"
               sx={{ filter: "drop-shadow(2px 2px 6px #222)" }}
            >  
               {
                  blobURL && (
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
                        <CustomTooltip arrow title="Crop">
                           <IconButton
                              sx={{ 
                                 backgroundColor: "primary.main",
                                 '&:hover': { backgroundColor: "primary.dark" },
                              }} 
                           >
                              <CropIcon sx={{ color: "common.white" }} />
                           </IconButton>
                        </CustomTooltip>
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