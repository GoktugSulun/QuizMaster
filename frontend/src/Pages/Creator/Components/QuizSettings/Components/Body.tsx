import { TextInput } from "@/Core/Inputs";
import { VisibilityEnums } from "@/Pages/Creator/Model/Creator.model";
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import Image from "./Image";
import PrivateIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';

const Body = () => {
   const form = useFormContext();
   
   const visibility = useWatch({ control: form.control, name: "visibility" });
   
   return (
      <Stack 
         padding="35px 25px"
         maxHeight= "95vh"
         overflow= "auto"
         // sx={{ '::-webkit-scrollbar': { width:  } }}
      >
         <Stack 
            flexDirection={{ xs: "column-reverse", md: "row" }}
            alignItems={{ xs: "stretch", md: "center"  }}
            sx={{ }}
            gap="15px 25px"
         >
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
            <Image />
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
            <Stack 
               marginTop="5px"
               flexDirection="row" 
               alignItems="center" 
               gap="10px"
            >
               { visibility === VisibilityEnums.PRIVATE && <PrivateIcon sx={{ color: "primary.main" }} /> }
               { visibility === VisibilityEnums.PUBLIC && <PublicIcon sx={{ color: "primary.main" }} /> }
               <Typography fontSize={14} paragraph>
                  { visibility === VisibilityEnums.PRIVATE && 'No one will see this quiz until you change the visibility.' }
                  { visibility === VisibilityEnums.PUBLIC && 'Everyone can access this quiz.' }
               </Typography>
            </Stack>
         </Stack>
      </Stack>
   )
}

export default Body