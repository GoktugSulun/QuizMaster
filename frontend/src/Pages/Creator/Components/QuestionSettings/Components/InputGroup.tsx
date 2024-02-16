import { SelectInput } from "@/Core/Inputs";
import { Stack, type SvgIconProps, Typography, Box } from "@mui/material"
import { useFormContext } from "react-hook-form";

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
            value={value}
            options={props.options}
         />
      </Box>
   )
}

export default InputGroup