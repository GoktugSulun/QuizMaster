import { Stack, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileHeader = () => {
   return (
      <Stack 
         flexDirection={"row"} 
         alignItems={"center"}
         justifyContent={"center"}
         gap={"20px"}
      >
         <AccountCircleIcon sx={{ fontSize: "50px", color: "primary.main" }} />
         <Typography 
            textAlign={"center"} 
            color={"primary.main"}
            variant="h4"
            fontWeight={"bold"}
         > 
            Profile 
         </Typography>
      </Stack>
   )
}

export default ProfileHeader