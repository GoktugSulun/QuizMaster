import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type HeaderProps = {
   handleClose: () => void
}

const Header = (props: HeaderProps) => {
   return (
      <Stack 
         flexDirection="row"
         alignItems="center"
         justifyContent="space-between"
         gap="10px"
         padding="10px 15px 10px 20px"
      >
         <Typography 
            fontWeight="bold" 
            variant="h5"
            color="primary.main"
         > 
            Quiz Settings 
         </Typography>
         <IconButton 
            sx={{ '&:hover': { backgroundColor: "custom.light" } }} 
            onClick={props.handleClose}>
            <CloseIcon sx={{ color: "primary.main" }} />
         </IconButton>
      </Stack>
   )
}

export default Header