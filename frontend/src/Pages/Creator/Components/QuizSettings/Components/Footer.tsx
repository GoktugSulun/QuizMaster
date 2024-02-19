import { snackbar } from "@/Core/Utils";
import { Button, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

type FooterProps = {
   handleClose: () => void
}

const Footer = (props: FooterProps) => {
   const form = useFormContext();

   const saveQuizSettings = async () => {
      const isValid = await form.trigger();
      if (!isValid) {
         snackbar("Please fill in the required fields!", { variant: "error" });
      }
      const data = form.getValues()
      console.log(data, 'data');
   };

   return (
      <Stack 
         flexDirection="row" 
         justifyContent="center" 
         gap="10px"
         padding="25px"
      >
         <Button
            sx={{
               flex: { xs: 1, md: 'initial' },
               width: 100,
               bgcolor: "secondary.light",
               color: "common.black",
               boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
               '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  color: "common.black",
               }
            }}
            onClick={props.handleClose}
         > 
            Cancel 
         </Button>
         <Button
            sx={{ 
               flex: { xs: 1, md: 'initial' },
               width: 150,
               fontSize: 18
            }}
            onClick={saveQuizSettings}
         > 
            Save 
         </Button>
      </Stack>
   )
}

export default Footer