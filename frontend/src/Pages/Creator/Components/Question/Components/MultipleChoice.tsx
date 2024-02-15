import * as QuestionStyle from "@/Components/Question/Style/Question.style";
import { useAppSelector } from "@/Core/Hooks";
import { TextInput } from "@/Core/Inputs";
import { type OptionType } from "@/Pages/Creator/Model/Creator.model";
import { Grid, Radio, alpha, useTheme } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

const MultipleChoice = () => {
   const theme = useTheme();
   const form = useFormContext();
   const { index } = useAppSelector((state) => state.Creator.activeSlide);

   const options: OptionType[] = useWatch({ control: form.control, name: `questions.${index}.options` });

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
               console.log(fontWeight, ' fon');
               console.log(isAnyOneSelect, ' isAnyOneSelected');
               

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
                           placeholder="Add Option"
                           multiline
                           shrink
                           inputProps={{ maxLength: 75, style: { fontSize: 20, lineHeight: 1.3 } }}
                           sx={{
                              '& .MuiOutlinedInput-notchedOutline': { border: "none" }
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