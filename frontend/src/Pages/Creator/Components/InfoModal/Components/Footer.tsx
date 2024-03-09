import { useThunk } from "@/Core/Hooks";
import { Button, Stack, alpha, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom";

type FooterProps = {
   handleClose: () => void
}

const Footer = ({ handleClose }: FooterProps) => {
   const theme = useTheme();
   const navigate = useNavigate();
   
   const { isLoading: isLoadingCreate, isSuccess: isSuccessCreate, isError: isErrorCreate } = useThunk("createQuestions");
   const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, isError: isErrorEdit } = useThunk("editQuestions");
   const isLoading = isLoadingCreate || isLoadingEdit;
   const isSuccess = isSuccessCreate || isSuccessEdit;
   const isError = isErrorCreate || isErrorEdit;

   const valueMap = (() => {
      if (isLoading) {
         return { primary: "primary.main", secondary: "custom.light" }
      }
      if (isSuccess) {
         return { primary: "success.main", secondary: alpha(theme.palette.success.main, 0.2) }
      }
      if (isError) {
         return { primary: "error.main", secondary: alpha(theme.palette.error.main, 0.2) }
      }
      return { primary: "primary.main", secondary: "custom.light" }
   })();

   const navigateToHome = () => {
      navigate('/feed');
   }

   return (
      <Stack 
         flexDirection="row"
         justifyContent="space-between"
         alignItems="center"
         gap="10px"
         maxHeight={isLoading ? 0 : "300px"}
         overflow="hidden"
         sx={{ transition: "max-height 350ms" }}
      >
         <Button 
            onClick={handleClose}
            sx={{ 
               bgcolor: valueMap.secondary, 
               color: valueMap.primary,
               border: "1px solid", 
               borderColor: valueMap.secondary,
               "&:hover": {
                  bgcolor: valueMap.secondary, 
                  borderColor: valueMap.primary
               }
            }}
         >
            Stay Here
         </Button>
         <Button 
            onClick={navigateToHome}
            sx={{
               bgcolor: valueMap.primary,
               color: "common.white",
               "&:hover": {
                  bgcolor: valueMap.primary,
                  color: "common.white",
               }
            }}
         >
            Go Home Page
         </Button>
      </Stack>
   )
}

export default Footer