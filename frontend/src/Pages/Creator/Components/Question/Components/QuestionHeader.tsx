import { TextInput } from "@/Core/Inputs";
import { Stack, useTheme } from "@mui/material"
import { useFormContext } from "react-hook-form";

const QuestionHeader = () => {
  const theme = useTheme();
  const form = useFormContext();

  const index = form.watch("activeIndex");
  const name = form.watch(`questions.${index}.name`);
  
  return (
    <Stack 
      alignItems="center" 
      padding="10px 20px"
      margin="20px"
      borderRadius="10px"
    >
      <TextInput 
        name={`questions.${index}.name`}
        value={name}
        control={form.control}
        sx={{
          boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
          '& .MuiOutlinedInput-notchedOutline': { border: "none" }
        }}
        inputProps={{ maxLength: 120, style: { textAlign: "center", fontSize: 25, lineHeight: 1.3 } }}
        fullWidth
        multiline
        maxRows={3}
        shrink
        placeholder="Write your question" 
      />
    </Stack>
  )
}

export default QuestionHeader