import { BaseModal } from "@/Core/Components"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CustomTooltip } from "@/Components/Tooltip";
import { Box, IconButton } from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';
import { type Area } from "react-easy-crop";
import { snackbar } from "@/Core/Utils";
import { useFormContext } from "react-hook-form";
import ImageCropper from "./Components/ImageCropper";

const getCroppedImg = async (imageURL: string, croppedAreaPixels: Area): Promise<Blob> => {
   return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageURL;
      image.crossOrigin = "Anonymous";
      
      image.onload = () => {
         const canvas = document.createElement('canvas');
         const ctx = canvas.getContext('2d');

         if (!ctx) {
            return reject(new Error("Canvas is empty!"))
         }
   
         canvas.width = croppedAreaPixels.width;
         canvas.height = croppedAreaPixels.height;
   
         ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
         );
   
         canvas.toBlob((blob) => {
            if (!blob) {
               reject(new Error('Canvas is empty'));
               return;
            }
            resolve(blob);
         }, 'image/jpeg');

      };
      image.onerror = (error) => reject(error);
   });
};
  
type ImageCropperModalProps = {
   image: File | string | null;
   openState: [boolean, Dispatch<SetStateAction<boolean>>];
   handleClose: () => void;
   aspectRatio: number;
   width: number;
   height: number;
   buttonColor?: "primary" | "secondary";
   cropShape?: "rect" | "round"
}

type ButtonStyle = { 
   bgColor: string; 
   hoverBgColor: string;
   color: string 
};

const ImageCropperModal = (props: ImageCropperModalProps) => {
   const form = useFormContext();
   const { image, openState, handleClose, aspectRatio, width, height, buttonColor="primary", cropShape="rect" } = props;
   const [open, setOpen] = openState;
   const [imageURL, setImageURL] = useState("");
   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
   const [buttonStyle, setButtonStyle] = useState<ButtonStyle>({ bgColor: "", hoverBgColor: "", color: "" });

   const handleOpen = () => setOpen(true);

   const onCropCompleteHandler = (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
   };

   const getFileName = () => {
      if (!image) {
         return "";
      }
      if (typeof image == "object" && image !== null) {
         return image.name;
      }
      const [_time, _uuid, fileName] = image.split("_");
      return fileName;
   }

   const getCroppedImage = async () => {
      if (!imageURL) {
         snackbar("Image couldn't found to crop!", { variant: "error" });
         return;
      }
      if (!croppedAreaPixels) {
         snackbar("Area couldn't found to crop!", { variant: "error" });
         return;
      }
      try {
         const croppedImageBlob = await getCroppedImg(imageURL, croppedAreaPixels);
         const fileName = getFileName();
         const file = new File([croppedImageBlob], fileName, { type: 'image/jpeg' });
         form.setValue("image", file);
         handleClose();
      } catch (error) {
         if (error instanceof Error) {
            snackbar(error.message, { variant: "error" });
         } else {
            snackbar("Error occurs while cropping!", { variant: "error" });
         }
      }
   }

   useEffect(() => {
      const blobURL = (typeof image == "object" && image !== null) ? URL.createObjectURL(image) : "";
      const imageURL = (blobURL || image || "http://localhost:8000/default.png") as string; 
      setImageURL(imageURL);

      return () => {
         URL.revokeObjectURL(imageURL)
      }
   }, [image])

   useEffect(() => {
      switch (buttonColor) {
         case "primary":
            setButtonStyle({ bgColor: "primary.main", hoverBgColor: "primary.dark", color: "common.white" })
            break;
         case "secondary": 
            setButtonStyle({ bgColor: "primary.light", hoverBgColor: "primary.light", color: "primary.main" })
            break;
         default:
            break;
      }
   }, [buttonColor])

   return (
      <Box>
         <CustomTooltip arrow title="Crop">
            <IconButton
               sx={{ 
                  backgroundColor: buttonStyle.bgColor,
                  '&:hover': { backgroundColor: buttonStyle.hoverBgColor },
                  
               }} 
               onClick={handleOpen}
            >
               <CropIcon sx={{ color: buttonStyle.color }} />
            </IconButton>
         </CustomTooltip>
         <BaseModal
            open={open}
            title="Resize your image"
            secondButtonName="Crop"
            secondButtonOnClick={getCroppedImage}
            handleClose={handleClose}
         >
            <ImageCropper 
               image={imageURL} 
               onCropCompleteHandler={onCropCompleteHandler} 
               aspectRatio={aspectRatio}
               width={width}
               height={height}
               cropShape={cropShape}
            />
         </BaseModal>
      </Box>
   )
}

export default ImageCropperModal