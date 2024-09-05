import { Button, MenuItem, Stack, Typography, alpha, styled } from '@mui/material';

export const HeaderWrapper = styled(Stack)({
   width: '100%',
   height: "90px",
   position: "sticky",
   top: 0,
   zIndex: 10,
});

export const Header = styled('div')(({ theme }) => ({
   width: '100%',
   height: '80px',
   borderRadius: 5,
   background: theme.palette.common.white,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
   display: 'grid',
   placeItems: 'center',
   color: theme.palette.primary.main,
}));

export const ProfileMenuItem = styled(MenuItem)({
   width: 180,
   padding: '10px 20px',
   '&:not(:first-of-type, :last-of-type)': {
      padding: '14px 20px'
   },
   '& .MuiSvgIcon-root': {
      width: 25,
      height: 25
   }
});

//* SlotProps.paper for ProfileMenu
export const ArrowPaper = () => ({
   elevation: 0,
   sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
         width: 32,
         height: 32,
         ml: -0.5,
         mr: 1,
      },
      '&::before': {
         content: '""',
         display: 'block',
         position: 'absolute',
         top: 0,
         right: 14,
         width: 10,
         height: 10,
         bgcolor: 'background.paper',
         transform: 'translateY(-50%) rotate(45deg)',
         zIndex: 0,
      },
   },
});

export const SaveButton = styled(Button)(({ theme }) => ({
   padding: "5px 30px",
   fontSize: 16,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
}));

export const QuitButton = styled(Button)(({ theme }) => ({
   padding: "5px 20px",
   background: theme.palette.secondary.light,
   color: theme.palette.common.black,
   boxShadow: `${theme.palette.secondary.light} 0px 1px 4px`,
   '&:hover': {
      background: alpha(theme.palette.secondary.light, 0.1),
   }
}));

export const EyeButton = styled(QuitButton)(({ theme }) => ({
   '& .MuiSvgIcon-root': {
      color: alpha(theme.palette.secondary.light, 0.6),
   }
}));