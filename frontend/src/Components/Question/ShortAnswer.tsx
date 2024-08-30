import { TextInput } from "@/Core/Inputs";
import { alpha, Grid, Stack, Typography, useTheme } from "@mui/material";
import * as QuestionStyle from "@/Components/Question/Style/Question.style";
import { type UserShortAnswerType, type Option } from "@/Pages/Quiz/Types/QuizTypes";
import { type ShortAnswerFuncParams } from "@/Pages/Quiz/Components/Options";

type DisabledProps = {
   readOnly?: true;
   answersBelongToUsers: string[];
   correctAnswers: UserShortAnswerType[];
   options: Option[];
 }
 
 type DefaultProps = {
   readOnly?: false; 
   onChange: (params: ShortAnswerFuncParams) => void;
   userAnswers: UserShortAnswerType[];
   options: Option[];
 }
 
type ShortAnswerProps = DefaultProps | DisabledProps;

const ShortAnswer = (props: ShortAnswerProps) => {
   const { readOnly=false, options } = props;
   const theme = useTheme();

   const answers = readOnly ? [...((props as DisabledProps).correctAnswers)] : [...((props as DefaultProps).userAnswers)];

   const getStyle = (index: number) => {
      if (!readOnly) {
         return {
            $bgColor: 'initial',
            $color: 'initial',
            $fontWeight: 'initial'
         }
      }

      const correctAnswer = (props as DisabledProps).correctAnswers[index].text || "";
      const isCorrect = !!(props as DisabledProps).answersBelongToUsers.find((answer) => answer.toLocaleLowerCase() === correctAnswer.toLocaleLowerCase());
      const isBlank = !!(props as DisabledProps).answersBelongToUsers.every((answer) => !answer);
      const $bgColor = (isCorrect || isBlank) ? alpha(theme.palette.success.light, 0.3) : 'initial';
      const $color = (isCorrect || isBlank) ? alpha(theme.palette.success.main, 1) : 'initial';
      const $fontWeight = (isCorrect || isBlank) ? 'bold' : 'initial';

      return {
         $bgColor,
         $color,
         $fontWeight,
      } 
   }

   return (
      <Grid container spacing={2}>
         {
            readOnly && !!(props as DisabledProps).answersBelongToUsers.length
               && (
                  <Grid marginBottom={"10px"} item xs={12}>
                     <Stack alignItems="center" flexDirection={"row"}>
                        <Typography 
                           paragraph 
                           textAlign="left"
                           bgcolor="custom.light"
                           color="primary.main"
                           borderRadius="5px"
                           padding="10px 20px"
                           fontWeight="bold"
                           flex={1}
                        > 
                           Your Answers: { (props as DisabledProps).answersBelongToUsers.join(", ") }
                        </Typography>
                     </Stack>
                  </Grid>
               ) 
         }
         <Grid item xs={12}>
            <QuestionStyle.OptionBox 
               size="small"
               {...getStyle(0)}
            >
               <TextInput
                  fullWidth
                  shrink
                  readOnly={readOnly}
                  placeholder="Write an answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[0].id, index: 0, text: e.target.value.trim() })})}
                  value={answers[0]?.text || ""}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />
            </QuestionStyle.OptionBox>
         </Grid>
         <Grid marginTop="10px" item xs={12}>
            <Stack alignItems="center">
               <Typography 
                  paragraph 
                  textAlign="center"
                  bgcolor="custom.light"
                  color="primary.main"
                  borderRadius="5px"
                  padding="10px 20px"
                  fontWeight="bold"
               > 
                  Other Correct Answers:
               </Typography>
            </Stack>
         </Grid>
         <Grid item xs={12} md={4}>
            <QuestionStyle.OptionBox 
               size="small"
               {...getStyle(1)}
            >
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[1].id, index: 1, text: e.target.value })})}
                  value={answers[1]?.text || ""}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />
            </QuestionStyle.OptionBox>
         </Grid>
         <Grid item xs={12} md={4}>
            <QuestionStyle.OptionBox 
               size="small"
               {...getStyle(2)}
            >
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[2].id, index: 2, text: e.target.value })})}
                  value={answers[2]?.text || ""}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />
            </QuestionStyle.OptionBox>
         </Grid>
         <Grid item xs={12} md={4}>
            <QuestionStyle.OptionBox 
               size="small"
               {...getStyle(3)}
            >
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[3].id, index: 3, text: e.target.value })})}
                  value={answers[3]?.text || ""}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />   
            </QuestionStyle.OptionBox>
         </Grid>
      </Grid>
   )  
}

export default ShortAnswer