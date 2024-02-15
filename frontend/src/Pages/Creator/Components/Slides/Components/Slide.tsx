import { Stack, Typography, useTheme } from '@mui/material';
import * as S from '../../../Style/Creator.style';
import ImageIcon from '@mui/icons-material/Image';
import { type QuestionType } from '@/Pages/Creator/Model/Creator.model';
import { useFormContext } from 'react-hook-form';

type SliceProps = {
   index: number;
   field: QuestionType
};

const Slide = (props: SliceProps) => {
   const theme = useTheme();
   const form = useFormContext();
   const isActive = props.index === form.getValues("activeIndex");

   const setActiveSlideHandler = () => {
      form.setValue('activeIndex', props.index);
   };

   return (
      <S.Slide onClick={setActiveSlideHandler} $isActive={isActive}>
         <Typography 
            fontSize={14} 
            paragraph
            {...(isActive ? { color: theme.palette.primary.main, fontWeight: "bold" } : {})}
         > 
            {props.index + 1}. Multiple Choice 
         </Typography>
         <Stack
            className="slide"
            padding="15px 35px"
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
            > 
               Question 
            </Typography>
            <Stack 
               border="1px dashed grey"
               justifyContent="center"
               alignItems="center"
               padding="5px 10px"
            >
               <ImageIcon />
            </Stack>
         </Stack>
      </S.Slide>
   )
}

export default Slide