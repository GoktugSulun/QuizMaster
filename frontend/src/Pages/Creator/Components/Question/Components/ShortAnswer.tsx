import { TextInput } from "@/Core/Inputs";
import { Grid, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import * as QuestionStyle from "@/Components/Question/Style/Question.style";

const ShortAnswer = () => {
   const form = useFormContext();
   const index = form.getValues("activeIndex"); 

   const options = form.watch(`questions.${index}.options`);

   return (
      <Grid container spacing={2}>
         <Grid item xs={12}>
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write an answer"
                  control={form.control}
                  name={`questions.${index}.options.0.name`}
                  value={options[0].name}
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
         <Grid item xs={4}>
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  control={form.control}
                  name={`questions.${index}.options.1.name`}
                  value={options[1].name}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />
            </QuestionStyle.OptionBox>
         </Grid>
         <Grid item xs={4}>
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  control={form.control}
                  name={`questions.${index}.options.2.name`}
                  value={options[2].name}
                  sx={{
                     '& .MuiOutlinedInput-notchedOutline': { border: "none" }
                  }}
               />
            </QuestionStyle.OptionBox>
         </Grid>
         <Grid item xs={4}>
            <QuestionStyle.OptionBox size="small">
               <TextInput
                  fullWidth
                  shrink
                  placeholder="Write a other answer"
                  control={form.control}
                  name={`questions.${index}.options.3.name`}
                  value={options[3].name}
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