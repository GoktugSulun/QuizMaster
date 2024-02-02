import { Box, Grid, Stack } from '@mui/material';
import * as S from '../Style/Quiz.style';
import CheckboxInput from '@/Core/Inputs/Checkbox';
import { useMaterialForm } from '@/Core/Hooks';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TextInput } from '@/Core/Inputs';

const MultipleChoice = () => {
   const { registerHandler } = useMaterialForm({ defaultValues: { answer: false, text: '' } });

   return (
      <Stack 
         flex={1} 
         justifyContent="center" 
         alignItems="center"
         padding="0 50px"
      >
         <Grid container rowSpacing={5} columnSpacing={3}>
            <Grid item md={6} >
               <S.AnswerBox >
                  <CheckboxInput 
                     checkbox={{
                        icon: <RadioButtonUncheckedIcon />,
                        checkedIcon: <CheckCircleIcon />,
                     }}
                     label="A şıkkı"
                     name="A"
                     onChange={(e, checked: boolean) => console.log('checked => ', checked)} 
                  />
               </S.AnswerBox>
            </Grid>
            <Grid item md={6} display="flex" alignItems="center">
               <S.AnswerBox>
                  <TextInput
                     {...registerHandler('text')}
                  />
               </S.AnswerBox>
            </Grid>
            <Grid item md={6} display="flex" alignItems="center">
               <S.AnswerBox>
                  <CheckboxInput 
                     checkbox={{
                        icon: <RadioButtonUncheckedIcon />,
                        checkedIcon: <CheckCircleIcon />,
                     }}
                     label="A şııkı" 
                     {...(registerHandler("answer"))} 
                  />
               </S.AnswerBox>
            </Grid>
            <Grid item md={6} display="flex" alignItems="center">
               <S.AnswerBox>
                  <CheckboxInput 
                     checkbox={{
                        icon: <RadioButtonUncheckedIcon />,
                        checkedIcon: <CheckCircleIcon />,
                     }}
                     label="A şııkı" 
                     {...(registerHandler("answer"))} 
                  />
               </S.AnswerBox>
            </Grid>
         </Grid>
      </Stack>
   )
}

export default MultipleChoice