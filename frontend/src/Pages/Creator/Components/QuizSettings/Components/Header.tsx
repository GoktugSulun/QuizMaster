import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type HeaderProps = {
   handleClose: () => void
}

const Header = (props: HeaderProps) => {
   return (
      <Stack 
         flexDirection="row"
         alignItems="flex-end"
         justifyContent="space-between"
         gap="10px"
         padding="20px 20px 20px 25px"
      >
         <Typography 
            fontWeight="bold" 
            variant="h5"
            color="primary.main"
         > 
            Quiz Settings 
         </Typography>
         <IconButton 
            sx={{ 
               backgroundColor: "custom.light",
               '&:hover': { backgroundColor: "primary.main" },
               '&:hover .MuiSvgIcon-root': { color: "common.white" } 
            }} 
            onClick={props.handleClose}>
            <CloseIcon sx={{ color: "primary.main" }} />
         </IconButton>
      </Stack>
   )
}

export default Header