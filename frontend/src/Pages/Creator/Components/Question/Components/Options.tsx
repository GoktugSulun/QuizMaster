import { Stack } from "@mui/material"
import MultipleChoice from "./MultipleChoice"

const Options = () => {
  
  return (
    <Stack 
      flex={1} 
      alignItems="center" 
      justifyContent="center"
      padding="0 50px"
    >
      <MultipleChoice />
    </Stack>
  )
}

export default Options