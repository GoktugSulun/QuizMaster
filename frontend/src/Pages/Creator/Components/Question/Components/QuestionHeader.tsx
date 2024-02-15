import { useAppSelector } from "@/Core/Hooks";
import { TextInput } from "@/Core/Inputs";
import { Stack, useTheme } from "@mui/material"
import { useFormContext } from "react-hook-form";

const QuestionHeader = () => {
  const theme = useTheme();
  const { control } = useFormContext();
  const { index } = useAppSelector((state) => state.Creator.activeSlide);

  return (
    <Stack 
      alignItems="center" 
      padding="10px 20px"
      margin="20px"
      borderRadius="10px"
    >
      <TextInput 
        name={`questions.${index}.name`}
        control={control}
        sx={{
          boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
          '& .MuiOutlinedInput-notchedOutline': { border: "none" }
        }}
        inputProps={{ style: { textAlign: "center", fontSize: 25, lineHeight: 1.3 } }}
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