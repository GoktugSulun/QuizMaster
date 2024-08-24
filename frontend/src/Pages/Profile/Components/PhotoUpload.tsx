import { Button, IconButton, Stack } from "@mui/material"
import { VisuallyHiddenInput } from "../Style/Profile.style"
import { useFormContext } from "react-hook-form"
import { ProfilePhoto } from "@/Components/ProfilePhoto";
import { ChangeEvent, useState } from "react";
import { snackbar } from "@/Core/Utils";
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomTooltip } from "@/Components/Tooltip";
import ImageCropperModal from "@/Components/ImageCropper/ImageCropperModal";

const PhotoUpload = () => {
   const { watch, setValue } = useFormContext();
   const [openImageCropper, setOpenImageCropper] = useState(false);
   const [selectedImage, setSelectedImage] = useState<File | null>(null);

   const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
         setSelectedImage(file);
         setOpenImageCropper(true);
      } else {
         snackbar("Error occurs while file uploading!", { variant: "error" })
      }
   }

   const removeImageHandler = () => {
      setValue("image", "")
   }

   return (
      <Stack alignItems={"center"} justifyContent={"flex-start"} gap={"15px"}>
         <ProfilePhoto 
            image={watch("image")}
            name={watch("name")}
            surname={watch("surname")}
         />
         <Stack 
            flexDirection={"row"} 
            alignItems={"center"}
            justifyContent={"center"}
            gap={"10px"}
         >
            {
               (watch("image") || selectedImage)
                  && (
                     <>
                        <CustomTooltip arrow title="Remove Image">
                           <IconButton onClick={removeImageHandler} sx={{ bgcolor: "primary.light", "&:hover": { bgcolor: "primary.light" } }}>
                              <DeleteIcon sx={{ color: "primary.main" }} />
                           </IconButton>
                        </CustomTooltip>
                        <ImageCropperModal 
                           image={selectedImage || watch("image")} 
                           openState={[openImageCropper, setOpenImageCropper]}
                           handleClose={() => { 
                              setOpenImageCropper(false);
                              setSelectedImage(null);
                            }}
                           width={600}
                           height={400}
                           aspectRatio={1}
                           buttonColor="secondary"
                           cropShape="round"
                        />
                     </>
                  )
            }
            <Button
               component="label"
               role={undefined}
               variant="contained"
               tabIndex={-1}
            >
               { watch("image") ? "Change Image" : "Upload Image" }
               <VisuallyHiddenInput accept="image/*" onChange={fileHandler} type="file" />
            </Button>
         </Stack>
      </Stack>
   )
}

export default PhotoUpload