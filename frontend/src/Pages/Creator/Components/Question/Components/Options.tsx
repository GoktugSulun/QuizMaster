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
      <MultipleChoice
        options={[
          { id: 1, name: 'A şıkkı', isCorrect: true },
          { id: 2, name: 'B şıkkı', isCorrect: false },
          { id: 3, name: 'C şıkkı', isCorrect: false },
          { id: 4, name: 'D şıkkı', isCorrect: false },
        ]}
      />
    </Stack>
  )
}

export default Options