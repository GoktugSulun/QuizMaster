import { BaseModal, Loading } from "@/Core/Components";
import { useAppDispatch, useAppSelector, useThunk } from "@/Core/Hooks"
import { DashboardActions } from "../Store/Dashboard.slice";
import DashboardThunks from "../Store/Dashboard.thunk";
import { Stack, Typography, useTheme } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { useEffect } from "react";

const ConfirmModal = () => {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const open = useAppSelector((state) => state.Dashboard.isOpenConfirmModal);
   const targetQuiz = useAppSelector((state) => state.Dashboard.targetQuiz);
   
   const { isLoading, isSuccess, isError, setIdle } = useThunk("deleteQuiz");

   const handleClose = () => {
      dispatch(DashboardActions.setIsOpenConfirmModal("CLOSE"))
   }

   const handleDelete = () => {
      DashboardThunks.deleteQuiz(targetQuiz.id);
   }

   useEffect(() => {
      if (isSuccess || isError) {
         setIdle();
         handleClose();
      }
   }, [isSuccess, isError])

   return (
      <BaseModal
         open={open}
         handleClose={handleClose}
         secondButtonName="Delete"
         secondButtonOnClick={handleDelete}
         title="Confirm"
         disableCloseButton={isLoading}
         disableFirstButton={isLoading}
         disableSecondButton={isLoading}
      >
         <Stack 
            padding={"25px 0"} 
            alignItems={"center"} 
            gap="10px"
         >
            {
               isLoading
                  ? <Loading size={100} />
                  : <HelpIcon sx={{ color: theme.palette.primary.main, fontSize: "120px" }} />
            }
            <Typography
               color={"#5e5e5e"} 
               textAlign={"center"}
            >
               Are you sure you want to delete the "{targetQuiz.name}" quiz?
            </Typography>
         </Stack>
      </BaseModal>
   )
}

export default ConfirmModal