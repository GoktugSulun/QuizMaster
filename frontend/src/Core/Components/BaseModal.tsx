import Modal from '@mui/material/Modal';
import { Button, Divider, IconButton, Stack, styled, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const StyledBaseModal = styled("div")(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   background: theme.palette.common.white,
   borderRadius: "10px",
   minWidth: "600px",
   padding: "20px 30px",
   outline: "none",
   transition: "min-width 350ms",
   [theme.breakpoints.down("sm")]: {
      minWidth: "90%",
   }
}));

type BaseModalProps = {
   children: React.ReactNode;
   open: boolean;
   handleClose: () => void;
   disableCloseButton?: boolean;
   title: string;
   firstButtonName?: string;
   firstButtonOnClick?: () => void;
   disableFirstButton?: boolean;
   secondButtonName: string;
   secondButtonOnClick: () => void;
   disableSecondButton?: boolean;
}

const BaseModal = (props: BaseModalProps) => {
   const { 
      children, 
      open, 
      handleClose, 
      disableCloseButton = false,
      title, 
      firstButtonName = "Cancel", 
      firstButtonOnClick,
      disableFirstButton = false,
      secondButtonName, 
      secondButtonOnClick,
      disableSecondButton = false
   } = props;
   const theme = useTheme();

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
         >
            <StyledBaseModal>
               <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
               >
                  <Typography 
                     variant="h6" 
                     color={theme.palette.primary.main}
                     fontWeight={"bold"}
                  > 
                     { title }
                  </Typography>
                  <IconButton 
                     sx={{ 
                        backgroundColor: "custom.light",
                        '&:hover': { backgroundColor: "primary.main" },
                        '&:hover .MuiSvgIcon-root': { color: "common.white" } 
                     }} 
                     onClick={handleClose}
                     disabled={disableCloseButton}
                  >
                     <CloseIcon sx={{ color: "primary.main" }} />
                  </IconButton>
               </Stack>
               <Divider sx={{ marginTop: "10px" }} />
               { children }
               <Divider sx={{ marginBottom: "10px" }} />
               <Stack
                  marginTop={"20px"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"15px"}
               >
                  <Button
                     sx={{
                        bgcolor: "secondary.light",
                        color: "common.black",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        '&:hover': {
                           bgcolor: 'rgba(0, 0, 0, 0.1)',
                           color: "common.black",
                        }
                     }}
                     onClick={firstButtonOnClick ?? handleClose}
                     disabled={disableFirstButton}
                  >
                     {firstButtonName}
                  </Button>
                  <Button onClick={secondButtonOnClick} disabled={disableSecondButton}>
                     {secondButtonName}
                  </Button>
               </Stack>
            </StyledBaseModal>
         </Modal>
      </div>
   );
};

export default BaseModal;
