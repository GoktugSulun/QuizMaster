import { Button, Stack, Typography, useTheme } from '@mui/material';
import * as S from '../../Style/Creator.style';
import { CustomTooltip } from '@/Components/Tooltip';

const CreatorHeader = () => {
   const theme = useTheme();

   return (
      <S.CretorHeader>
         <Stack
            flexDirection="row"
            alignItems="center"
            gap={5}
            border={`1px solid ${theme.palette.secondary.light}`}
            borderRadius="5px"   
            padding="8px 10px"
            sx={{ cursor: "pointer" }}
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
               title="Quit from creator"
            >
               <S.QuitButton> Quit </S.QuitButton>
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