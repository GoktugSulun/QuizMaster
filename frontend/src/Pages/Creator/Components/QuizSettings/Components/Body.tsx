import { Autocomplete, TextInput } from "@/Core/Inputs";
import { VisibilityEnums } from "@/Pages/Creator/Types/CreatorTypes";
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import Image from "./Image";
import PrivateIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import { getTimeOptions } from "@/Core/Helper";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { type TimeType } from "../QuizSettings";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Body = () => {
   const form = useFormContext();
   
   const [visibility, totalAttempt, minute, second] = useWatch({ 
      control: form.control, 
      name: ["visibility", "totalAttempt", "minute", "second"] }) as [VisibilityEnums, number, TimeType | null, TimeType | null];

   const { errors } = useFormState({ control: form.control, name: ["minute", "second"] });
   const timeError = !!errors?.second;

   const triggerTimeValidation = () => {
      form.trigger("second")
   };   
   
   return (
      <Stack 
         padding="35px 25px"
         maxHeight="95vh"
         overflow="auto"
      >
         <Stack 
            flexDirection={{ xs: "column-reverse", md: "row" }}
            alignItems={{ xs: "stretch", md: "center"  }}
            gap="15px 25px"
         >
            <Stack flex={1}>
               <Typography 
                  fontSize={18} 
                  variant="h6"
                  color="primary.main"
               >
                  Name*
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
                  Description*
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
               fontSize={18} 
               variant="h6"
               color="primary.main"
            >
               Total Time*
            </Typography>
            <Stack
               marginTop="10px"
               flexDirection="row"
               alignItems="center"
               gap="10px"
               sx={{ '& .MuiOutlinedInput-root': { width: 100 } }}
            >
               <Autocomplete
                  label="Minute"
                  shrink
                  placeholder="Minute"
                  control={form.control}
                  name="minute"
                  options={getTimeOptions()}
                  disableClearable
                  error={!!timeError}
                  onChange={triggerTimeValidation}
               />
               <Typography fontSize={25} color="primary.main"> : </Typography>
               <Autocomplete
                  label="Second"
                  shrink
                  placeholder="Second"
                  control={form.control}
                  name="second"
                  options={getTimeOptions()}
                  disableClearable
                  error={!!timeError}
               />
               <Stack 
                  flexDirection="row" 
                  alignItems="center" 
                  gap="5px"
                  bgcolor="custom.light"
                  padding="10px 15px"
                  borderRadius="5px"
               >
                  <AccessAlarmIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography color="primary.main" fontWeight="bold"> { minute?.name || "00" } </Typography> :
                  <Typography color="primary.main" fontWeight="bold"> { second?.name || "00" } </Typography>
               </Stack>
            </Stack>
            { (!!timeError) && <Typography mt={1} fontSize={14} color="error.main"> Please define a time for this quiz </Typography>}
         </Stack>
         <Stack marginTop="10px">
            <Typography 
               marginTop="10px" 
               fontSize={18} 
               variant="h6"
               color="primary.main"
            >
               Total Attempt
            </Typography>
            <RadioGroup
               row
               value={totalAttempt}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setValue("totalAttempt", Number(e.target.value))}
            >
               <FormControlLabel 
                  control={<Radio />} 
                  value={1} 
                  label={1} 
               />
               <FormControlLabel 
                  control={<Radio />} 
                  value={2} 
                  label={2} 
               />
               <FormControlLabel 
                  control={<Radio />} 
                  value={3} 
                  label={3} 
               />
            </RadioGroup>
            <Stack 
               marginTop="5px"
               flexDirection="row" 
               alignItems="center" 
               gap="10px"
            >
               <WarningAmberIcon sx={{ color: "primary.main" }} />
               <Typography fontSize={14} paragraph>
                  The quiz allows up to {totalAttempt} {totalAttempt === 1 ? "attempt" : "attempts"} per quiz solver when started.
               </Typography>
            </Stack>
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
                  control={<Radio />} 
                  value={VisibilityEnums.PRIVATE} 
                  label={VisibilityEnums.PRIVATE} 
               />
               <FormControlLabel 
                  control={<Radio />} 
                  value={VisibilityEnums.PUBLIC} 
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