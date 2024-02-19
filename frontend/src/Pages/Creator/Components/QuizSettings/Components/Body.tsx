import { TextInput } from "@/Core/Inputs"
import { VisibilityEnums } from "@/Pages/Creator/Model/Creator.model";
import { Box, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"

const Body = () => {
   const form = useFormContext();

   const visibility = form.watch("visibility");

   return (
      <Stack padding="10px 20px">
         <Stack flexDirection="row" gap="20px">
            <Stack flex={1}>
               <Typography 
                  fontSize={18} 
                  variant="h6"
                  color="primary.main"
               >
                  Name
               </Typography>
               <TextInput
                  control={form.control}
                  name="name"
                  placeholder="Quiz name"
                  shrink
               />
               <Typography 
                  marginTop="10px" 
                  fontSize={18} 
                  variant="h6"
                  color="primary.main"
               >
                  Description
               </Typography>
               <TextInput
                  control={form.control}
                  name="description"
                  placeholder="Quiz description..."
                  shrink
                  multiline
                  minRows={3}
                  maxRows={6}
               />
            </Stack>
            <Box flex={1}> image </Box>
         </Stack>
         <Stack marginTop="10px">
            <Typography 
               marginTop="10px" 
               fontSize={18} 
               variant="h6"
               color="primary.main"
            >
               Visibility
            </Typography>
            <RadioGroup
               row
               value={visibility}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setValue("visibility", e.target.value)}
            >
               <FormControlLabel 
                  value={VisibilityEnums.PRIVATE} 
                  control={<Radio />} 
                  label={VisibilityEnums.PRIVATE} 
               />
               <FormControlLabel 
                  value={VisibilityEnums.PUBLIC} 
                  control={<Radio />} 
                  label={VisibilityEnums.PUBLIC} 
               />
            </RadioGroup>
            <Typography fontSize={14} paragraph>
               { visibility === VisibilityEnums.PRIVATE && 'No one will see this quiz until you change the visibility.' }
               { visibility === VisibilityEnums.PUBLIC && 'Everyone can access this quiz.' }
            </Typography>
         </Stack>
      </Stack>
   )
}

export default Body