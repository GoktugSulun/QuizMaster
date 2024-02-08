import { MenuItem, styled } from '@mui/material';
import { shouldForwardProp } from '@/Core/Utils';
 
type SidebarProps = {
   isOpen: boolean
}

export const Sidebar = styled('div')<SidebarProps>(({ theme, isOpen }) => ({
   width: isOpen ? '250px' : '80px',
   minWidth: isOpen ? '250px' : '80px',
   height: 'calc(100vh - 80px)',
   background: theme.palette.common.white,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
   borderTop: '1px solid rgba(0, 0, 0, 0.16)',
   transition: 'min-width 350ms, width 350ms',
   position: 'relative',
   // overflow: 'hidden',
   '& .MuiIconButton-root': {
      position: 'absolute',
      top: 40,
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
   '& .MuiListItemIcon-root': {
      width: 'calc(80px - 16px - 16px)',
      minWidth: 'initial',
      display: 'flex',
      justifyContent: 'center',
      marginRight: 10,
      '& .MuiSvgIcon-root': {
         width: 30,
         height: 30,
         ...($isActive ? { color: theme.palette.primary.main } : { color: 'grey' } )
      },
   },
   '& .MuiListItemText-root': {
      opacity: $isOpen ? 1 : 0,
      visibility: $isOpen ? 'visible' : 'hidden',
      transition: 'opacity 350ms, visibility 350ms',
      '& .MuiTypography-root': {
         ...($isActive ? { color: theme.palette.primary.main } : {} )
      } 
   }
}));
