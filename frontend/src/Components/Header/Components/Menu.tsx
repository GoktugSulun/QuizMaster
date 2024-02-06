import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ProfileImg from '../../../../public/foto2.jpeg';
import { ArrowPaper } from '../Style/Header.style';
import { useTheme } from '@mui/material';
import * as S from '../Style/Header.style'

const ProfileMenu = () => {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const theme = useTheme();

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <React.Fragment>
         <Tooltip title="Account">
            <IconButton
               onClick={handleClick}
               size="small"
               aria-controls={open ? 'account-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
            >
            <Avatar 
               sx={{ width: 50, height: 50, border: `1px solid ${theme.palette.secondary.light}` }} 
               src={ProfileImg} 
               alt="User Image"
            > 
               GS 
            </Avatar>
            </IconButton>
         </Tooltip>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{ paper: ArrowPaper }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
         <S.ProfileMenuItem onClick={handleClose}>
            <Avatar /> Profile
         </S.ProfileMenuItem>
         <Divider sx={{ margin: '0 !important' }} />
         <S.ProfileMenuItem onClick={handleClose}>
            <ListItemIcon>
               <Settings fontSize="small" />
            </ListItemIcon>
            Settings
         </S.ProfileMenuItem>
         <Divider sx={{ margin: '0 !important' }} />
         <S.ProfileMenuItem onClick={handleClose}>
            <ListItemIcon>
               <Logout fontSize="small" />
            </ListItemIcon>
            Logout
         </S.ProfileMenuItem>
         </Menu>
      </React.Fragment>
  );
};

export default ProfileMenu;