import { IconButton, Stack, Typography, alpha, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useThunk } from "@/Core/Hooks";

type HeaderProps = {
   handleClose: () => void;
}

const Header = ({ handleClose } : HeaderProps) => {
   const theme = useTheme();
   const { isLoading: isLoadingCreate, isSuccess: isSuccessCreate, isError: isErrorCreate } = useThunk("createQuestions");
   const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, isError: isErrorEdit } = useThunk("editQuestions");
   const isLoading = isLoadingCreate || isLoadingEdit;
   const isSuccess = isSuccessCreate || isSuccessEdit;
   const isError = isErrorCreate || isErrorEdit;

   const valueMap = (() => {
      if (isLoading) {
         return { color: "primary.main", bgColor: "custom.light", text: "QUESTIONS ARE SAVING..." }
      }
      if (isSuccess) {
         return { color: "success.main", bgColor: alpha(theme.palette.success.main, 0.2), text: "QUESTIONS HAS BEEN SAVED" }
      }
      if (isError) {
         return { color: "error.main", bgColor: alpha(theme.palette.error.main, 0.2), text: "ERROR OCCURS" }
      }
      return { color: "common.black", bgColor: "custom.light", text: "" }
   })();

   return (
      <Stack
         flexDirection="row"
         justifyContent="space-between"
         alignItems="center"
         gap="10px"
      >
         <Typography
            variant="h6"
            color={valueMap.color}
            fontWeight="bold"
         >
            { valueMap.text }
         </Typography>
         {
            !isLoading 
               && <IconButton 
                  sx={{ 
                     backgroundColor: valueMap.bgColor,
                     '&:hover': { backgroundColor: valueMap.color },
                     '&:hover .MuiSvgIcon-root': { color: "common.white" } 
                  }} 
                  onClick={handleClose}>
                  <CloseIcon sx={{ color: valueMap.color }} />
               </IconButton>
         }
      </Stack>
   )
}

export default Header