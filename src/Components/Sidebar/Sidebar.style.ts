import { styled } from '@mui/material'

export const Sidebar = styled('div')(({ theme }) => ({
   width: '180px',
   height: 'calc(100vh - 80px)',
   background: theme.palette.common.white,
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
   borderRight: '1px solid rgba(0, 0, 0, 0.16)'
}));