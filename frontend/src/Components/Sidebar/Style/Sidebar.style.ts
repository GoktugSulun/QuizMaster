import { MenuItem, alpha, styled } from '@mui/material';
import { shouldForwardProp } from '@/Core/Utils';
 
type SidebarProps = {
   isOpen: boolean
}

export const Sidebar = styled('div')<SidebarProps>(({ theme, isOpen }) => ({
   width: isOpen ? '250px' : '80px',
   minWidth: isOpen ? '250px' : '80px',
   height: 'calc(100vh - 20px)',
   borderRadius: 5,
   background: theme.palette.common.white,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
   borderTop: '1px solid rgba(0, 0, 0, 0.16)',
   transition: 'min-width 350ms, width 350ms',
   position: 'relative',
   '& .MuiIconButton-root': {
      position: 'absolute',
      top: 100,
      right: -20,
      zIndex: 5,
      background: theme.palette.common.white,
      border: `1px solid ${theme.palette.secondary.light}`,
      '&:hover': {
         background: theme.palette.common.white,
      },
      '& .MuiSvgIcon-root': {
         width: 20,
         height: 20
      }
   }
}));

type ItemProps = {
   $isOpen: boolean;
   $isActive: boolean;
}

export const Item = styled(MenuItem, { shouldForwardProp })<ItemProps>(({ theme, $isOpen, $isActive }) => ({
   background: $isActive ? theme.palette.custom.light : 'inital',
   padding: '15px 10px',
   position: "relative",
   '&::after': {
      content: '""',
      width: $isActive ? 3 : 0,
      height: "100%",
      background: theme.palette.primary.main,
      position: "absolute",
      top: 0,
      left: 0,
      opacity: $isActive ? 1 : 0,
      visibility: $isActive ? 'visible' : 'hidden',
   },
   '&:hover': {
      background: alpha(theme.palette.custom.light, 0.7)
   },
   '& + .MuiDivider-root': {
      margin: 0,
      background: alpha(theme.palette.custom.light, 0.5)
   },
   '& .MuiListItemIcon-root': {
      width: 'calc(80px - 16px - 8px)',
      minWidth: 'initial',
      display: 'flex',
      justifyContent: 'center',
      '& .MuiSvgIcon-root': {
         width: 30,
         height: 30,
         color: $isActive ? theme.palette.primary.main : 'rgba(129, 117, 192, 0.8)'
      },
   },
   '& .MuiListItemText-root': {
      opacity: $isOpen ? 1 : 0,
      visibility: $isOpen ? 'visible' : 'hidden',
      transition: 'opacity 350ms, visibility 350ms',
      '& .MuiTypography-root': {
         color: theme.palette.primary.main,
         fontWeight: $isActive ? 'bold' : 'normal',
      } 
   }
}));

export const Logo = styled('div')({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: 10,
   padding: '20px 10px',
   '& img': {
      width: 'clamp(70px, 100%, 150px)',
      height: 'clamp(70px, 100%, 150px)',
   }
});