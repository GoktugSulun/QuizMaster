import { styled } from '@mui/material'

export const Header = styled('div')(({ theme }) => ({
   width: '100%',
   height: 80,
   background: theme.palette.common.white,
   boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
   // borderBottom: '1px solid rgba(0, 0, 0, 0.16)'
}));