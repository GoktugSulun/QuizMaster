import { TextInput } from "@/Core/Inputs";
import { Grid, Stack, Typography } from "@mui/material";
import * as QuestionStyle from "@/Components/Question/Style/Question.style";
import { type UserShortAnswerType, type Option } from "@/Pages/Quiz/Types/QuizTypes";
import { type ShortAnswerFuncParams } from "@/Pages/Quiz/Components/Options";

type DisabledProps = {
   readOnly?: true;
   userAnswers: UserShortAnswerType[];
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
   const { readOnly=false, userAnswers, options } = props;

   return (
      <Grid container spacing={2}>
         <Grid item xs={12}>
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  readOnly={readOnly}
                  placeholder="Write an answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[0].id, index: 0, text: e.target.value })})}
                  value={userAnswers[0]?.text || ""}
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
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[1].id, index: 1, text: e.target.value })})}
                  value={userAnswers[1]?.text || ""}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />
            </QuestionStyle.OptionBox>
         </Grid>
         <Grid item xs={12} md={4}>
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[2].id, index: 2, text: e.target.value })})}
                  value={userAnswers[2]?.text || ""}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />
            </QuestionStyle.OptionBox>
         </Grid>
         <Grid item xs={12} md={4}>
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  {...('onChange' in props && { onChange: (e) => props.onChange({ answerId: options[3].id, index: 3, text: e.target.value })})}
                  value={userAnswers[3]?.text || ""}
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