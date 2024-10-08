import { Box, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import * as S from '../../../Style/Creator.style';
import ImageIcon from '@mui/icons-material/Image';
import { QuestionEnums, type QuestionType } from '@/Pages/Creator/Types/CreatorTypes';
import { useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import DuplicateIcon from '@mui/icons-material/ContentCopy';
import { CustomTooltip } from '@/Components/Tooltip';

type SliceProps = {
   index: number;
   field: QuestionType;
   duplicateQuestionHandler: (event: React.MouseEvent<HTMLButtonElement>, field: QuestionType, index: number) => void;
   removeQuestionHandler: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
};

const Slide = (props: SliceProps) => {
   const theme = useTheme();
   const form = useFormContext();

   const questionType = form.watch(`questions.${props.index}.type`) as QuestionEnums;
   const isActive = props.index === form.getValues("activeIndex");

   const setActiveSlideHandler = () => {
      form.setValue('activeIndex', props.index);
   };

   return (
      <S.Slide 
         onClick={setActiveSlideHandler} 
         $isActive={isActive} 
         flexDirection="row"
         id={`${props.index}`}
      >
         <Stack alignSelf="flex-end">
            <CustomTooltip title="Duplicate" arrow placement="left">
               <IconButton 
                  sx={{ '&:hover .MuiSvgIcon-root': { color: theme.palette.primary.main } }}
                  onClick={(event) => props.duplicateQuestionHandler(event, props.field, props.index)}
               >
                  <DuplicateIcon 
                     fontSize="small" 
                     sx={{ color: theme.palette.custom.main }} 
                  />
               </IconButton>
            </CustomTooltip>
            <CustomTooltip title="Delete" arrow placement="left">
               <IconButton 
                  sx={{ '&:hover .MuiSvgIcon-root': { color: theme.palette.primary.main } }}
                  onClick={(event) => props.removeQuestionHandler(event, props.index)}
               >
                  <DeleteIcon 
                     fontSize="small" 
                     sx={{ color: theme.palette.custom.main }}
                  />
               </IconButton>
            </CustomTooltip>
         </Stack>
         <Box flex={1}>
            <Typography 
               fontSize={14} 
               paragraph
               {...(isActive ? { color: theme.palette.primary.main, fontWeight: "bold" } : {})}
            > 
               {props.index + 1}. {props.field.type}
            </Typography>
            <Stack
               className="slide"
               padding="15px 25px"
               borderRadius="5px"
               alignItems="center"
               bgcolor="rgb(150 147 147 / 10%)"
               border="2px solid rgb(150 147 147 / 10%)"
               gap={1}
            >
               <Typography 
                  fontSize={14}
                  paragraph 
                  textAlign="center"
                  padding="0 30px"
               > 
                  Question 
               </Typography>
               <Stack 
                  border={`1px dashed ${theme.palette.secondary.light}`}
                  justifyContent="center"
                  alignItems="center"
                  padding="5px 20px"
               >
                  <ImageIcon sx={{ color: theme.palette.secondary.light }} />
               </Stack>
               <Grid container spacing={1} marginTop="1px">
                  {
                     questionType === QuestionEnums.MULTIPLE_CHOICE 
                        && (
                           <>
                              <Grid item xs={6}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                              <Grid item xs={6}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                              <Grid item xs={6}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                              <Grid item xs={6}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                           </>
                        )
                  }
                  {
                     questionType === QuestionEnums.TRUE_FALSE 
                        && (
                           <>
                              <Grid item xs={6}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                              <Grid item xs={6}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                           </>
                        )
                  }
                  {
                     questionType === QuestionEnums.SHORT_ANSWER 
                        && (
                           <>
                              <Grid item xs={12}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                              <Grid item xs={4}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                              <Grid item xs={4}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                              <Grid item xs={4}> <Box padding="5px" border={`1px solid ${theme.palette.secondary.light}`} /> </Grid>
                           </>
                        )
                  }
               </Grid>
            </Stack>
         </Box>
      </S.Slide>
   )
}

export default Slide