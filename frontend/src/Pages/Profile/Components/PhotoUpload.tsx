import { Button, Stack } from "@mui/material"
import { VisuallyHiddenInput } from "../Style/Profile.style"
import { useFormContext } from "react-hook-form"
import { ProfilePhoto } from "@/Components/ProfilePhoto";

const PhotoUpload = () => {
   const { watch } = useFormContext();

   return (
      <Stack justifyContent={"flex-start"} gap={"15px"}>
         <ProfilePhoto 
            image={watch("image")}
            name={watch("name")}
            surname={watch("surname")}
         />
         <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
         >
            Upload Image
            <VisuallyHiddenInput type="file" />
         </Button>
      </Stack>
   )
}

export default PhotoUpload