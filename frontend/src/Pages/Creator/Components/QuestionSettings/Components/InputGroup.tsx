import { SelectInput } from "@/Core/Inputs";
import { CorrectOptionEnums, QuestionEnums } from "@/Pages/Creator/Types/CreatorTypes";
import { Stack, type SvgIconProps, Typography, Box, SelectChangeEvent } from "@mui/material"
import { useFormContext } from "react-hook-form";
import { OptionsMap } from "../../Question/Components/Options";

type InputGroupProps = {
   label: string;
   name: string;
   icon: (props: SvgIconProps) => JSX.Element;
   options: { id: number | string; name: string; }[];
   condition?: boolean;
}

const InputGroup = ({ condition=true, ...props }: InputGroupProps) => {
   const form = useFormContext();
   const Icon = props.icon;

   const activeSlide = form.watch("activeIndex");
   const value = form.watch(`questions.${activeSlide}.${props.name}`);
   
   const setOptionsByType = (event: SelectChangeEvent<unknown>) => {
      const questionType = event.target.value as QuestionEnums;
      form.setValue(`questions.${activeSlide}.options`, OptionsMap[questionType]);
      if (questionType === QuestionEnums.MULTIPLE_CHOICE) {
         form.setValue(`questions.${activeSlide}.optionType`, CorrectOptionEnums.SINGLE_OPTION);
      } else {
         form.setValue(`questions.${activeSlide}.optionType`, null);
      }
   };

   if (!condition) {
      return null;
   }

   return (
      <Box>
         <Stack 
            flexDirection="row" 
            alignItems="center" 
            marginBottom="5px"
         >
            <Icon />
            <Typography 
               fontSize="16px" 
               variant="h6"
               color="primary.main"
               fontWeight="bold"
            > 
               { props.label }
            </Typography>
         </Stack>
         <SelectInput
            fullWidth
            control={form.control}
            name={`questions.${activeSlide}.${props.name}`}
            {...(props.name === "type" ? { onChange: (e) => setOptionsByType(e) } : {})}
            value={value}
            options={props.options}
         />
      </Box>
   )
}

export default InputGroup