import * as QuestionStyle from "@/Components/Question/Style/Question.style";
import { TextInput } from "@/Core/Inputs";
import { type OptionType } from "@/Pages/Creator/Model/Creator.model";
import { Grid, Radio, alpha, useTheme } from "@mui/material";
import { useFormContext } from "react-hook-form";

type MultipleChoiceProps = {
   isTrueFalseQuestion?: boolean;
}

const MultipleChoice = ({ isTrueFalseQuestion=false }: MultipleChoiceProps) => {
   const theme = useTheme();
   const form = useFormContext();
   const index = form.getValues("activeIndex"); 

   const options = form.watch(`questions.${index}.options`) as OptionType[];

   const setCorrectOption = (optionIndex: number) => {
      const newOptionValues = options.map((option, index) => ({ ...option, isCorrect: index === optionIndex ? !option.isCorrect : false }));
      form.setValue(`questions.${index}.options`, newOptionValues);
   };
   
   return (
      <Grid 
         container
         spacing={3}
      >
         {
            options.map((option, optionIndex) => {
               const isCorrect = option.isCorrect;
               const isAnyOneSelect = options.some((option) => option.isCorrect);
               const bgColor = (() => {
                  if (!isAnyOneSelect) { return 'initial'; }
                  if (isCorrect) { return alpha(theme.palette.success.light, 0.3); }
                  return alpha(theme.palette.error.light, 0.3);
               })();
               const color = (() => {
                  if (!isAnyOneSelect) { return 'initial'; }
                  if (isCorrect) { return alpha(theme.palette.success.main, 1); }
                  return alpha(theme.palette.error.main, 1);
               })();
               const fontWeight = !isAnyOneSelect ? 'initial' : 'bold';
               const value = form.watch(`questions.${index}.options.${optionIndex}.name`);

               return (
                  <Grid 
                     key={optionIndex} 
                     item 
                     xs={12} 
                     lg={6}
                  >
                     <QuestionStyle.OptionBox
                        $bgColor={bgColor}
                        $color={color}
                        $fontWeight={fontWeight}
                        display="flex"
                        alignItems="center"
                        cursor="pointer"
                        gap={1}
                        size="small"
                        height="100%"
                     >
                        <Radio
                           checked={option.isCorrect}
                           value={option.isCorrect}
                           onClick={() => setCorrectOption(optionIndex)}
                        />
                        <TextInput
                           fullWidth
                           control={form.control}
                           name={`questions.${index}.options.${optionIndex}.name`}
                           value={value}
                           placeholder="Add Option"
                           multiline
                           disabled={isTrueFalseQuestion}
                           shrink
                           inputProps={{ maxLength: 75, style: { fontSize: 20, lineHeight: 1.3 } }}
                           sx={{
                              '& .MuiOutlinedInput-notchedOutline': { border: "none" },
                              "& .MuiInputBase-input.Mui-disabled": {
                                 WebkitTextFillColor: color,
                              },
                           }}
                        />
                     </QuestionStyle.OptionBox>
                  </Grid>
               )
            })
         }
      </Grid>
   )
}

export default MultipleChoice