import { Button, IconButton, Stack } from "@mui/material"
import { VisuallyHiddenInput } from "../Style/Profile.style"
import { useFormContext } from "react-hook-form"
import { ProfilePhoto } from "@/Components/ProfilePhoto";
import { ChangeEvent } from "react";
import { snackbar } from "@/Core/Utils";
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomTooltip } from "@/Components/Tooltip";

const PhotoUpload = () => {
   const { watch, setValue } = useFormContext();

   const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
         setValue("image", file)
      } else {
         snackbar("Error occurs while file uploading!", { variant: "error" })
      }
   }

   const removeImageHandler = () => {
      setValue("image", "")
   }

   return (
      <Stack justifyContent={"flex-start"} gap={"15px"}>
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
               watch("image")
                  && (
                     <CustomTooltip arrow title="Remove Image">
                        <IconButton onClick={removeImageHandler} sx={{ bgcolor: "primary.light", "&:hover": { bgcolor: "primary.light" } }} >
                           <DeleteIcon sx={{ color: "primary.main" }} />
                        </IconButton>
                     </CustomTooltip>
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