import CreatorButtons from "@/Components/Header/Components/CreatorButtons"
import CreatorInput from "@/Components/Header/Components/CreatorInput"
import { Stack } from "@mui/material"

const ResponsiveSettings = () => {
   return (
      <Stack 
         flexDirection={"row"} 
         alignItems={"center"}
         justifyContent={"space-between"}
         mt={2}
         p={1}
         bgcolor={"common.white"}
      >
         <CreatorInput />
         <CreatorButtons />
      </Stack>
   )
}

export default ResponsiveSettings