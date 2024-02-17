import { CustomTooltip } from "@/Components/Tooltip";
import { Box, Stack } from "@mui/material";
import * as S from '../Style/Header.style';
import { useNavigate } from "react-router-dom";
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import { useFormContext } from "react-hook-form";

const CreatorButtons = () => {
   const navigate = useNavigate();
   const form = useFormContext();

   const navigateToHome = () => {
      navigate('/');
   }

   const saveQuizHandler = () => {
      console.log(form.getValues(), ' quiz values');
   }
   
   return (
      <Stack 
         flexDirection="row"
         gap="10px"
      >  
         <CustomTooltip 
            placement="top"
            arrow 
            title="Preview"
         >
            <S.EyeButton startIcon={<EyeIcon />} > Preview </S.EyeButton>
         </CustomTooltip>
         <Box 
            width={2} 
            alignSelf="stretch" 
            bgcolor="secondary.light"
            margin="0 10px"
         />
         <CustomTooltip 
            placement="top"
            arrow 
            title="Quit from creator"
         >
            <S.QuitButton onClick={navigateToHome}> Quit </S.QuitButton>
         </CustomTooltip>
         <CustomTooltip 
            placement="top"
            arrow 
            title="Save this quiz"
         >
            <S.SaveButton onClick={saveQuizHandler}> Save </S.SaveButton>
         </CustomTooltip>
      </Stack>
   )
}

export default CreatorButtons