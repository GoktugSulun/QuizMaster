import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import * as S from '../../Style/Creator.style';
import { CustomTooltip } from '@/Components/Tooltip';
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';

const CreatorHeader = () => {
   const navigate = useNavigate();
   const theme = useTheme();

   const navigateToHome = () => {
      navigate('/');
   }

   return (
      <S.CretorHeader>
         <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={5}
            border={`1px solid ${theme.palette.secondary.light}`}
            borderRadius="5px"   
            padding="8px 10px"
            sx={{ cursor: "pointer" }}
            minWidth={300}
         >
            <Typography> Enter quiz title... </Typography>
            <Button> Settings </Button>
         </Stack>
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
               <S.SaveButton> Save </S.SaveButton>
            </CustomTooltip>
         </Stack>
      </S.CretorHeader>
   )
}

export default CreatorHeader