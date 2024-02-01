import { styled } from '@mui/material'

type SidebarProps = {
   isOpen: boolean
}

export const Sidebar = styled('div')<SidebarProps>(({ theme, isOpen }) => ({
   minWidth: isOpen ? '250px' : '80px',
   height: 'calc(100vh - 80px)',
   background: theme.palette.common.white,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
   borderTop: '1px solid rgba(0, 0, 0, 0.16)',
   transition: 'min-width 350ms',
   position: 'relative',
   '& .MuiIconButton-root': {
      position: 'absolute',
      top: 30,
      right: -20,
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