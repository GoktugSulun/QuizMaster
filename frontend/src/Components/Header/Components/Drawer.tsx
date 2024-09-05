import MuiDrawer from '@mui/material/Drawer';
import { Sidebar } from '@/Components/Sidebar';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { AppConfigActions } from '@/Core/Store/AppConfig.slice';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const Drawer = () => {
   const dispatch = useAppDispatch();
   const open = useAppSelector((state) => state.AppConfig.isOpenDrawer);

   const handleOpen = () => {
      dispatch(AppConfigActions.setIsOpenDrawer("OPEN"))
   };

   const handleClose = () => {
      dispatch(AppConfigActions.setIsOpenDrawer("CLOSE"))
   };

   return (
      <div>
         <IconButton 
            onClick={handleOpen}
            sx={{ 
               ml: 2,
               '&:hover': { backgroundColor: "custom.light" },
            }} 
         >
            <MenuIcon sx={{ color: "primary.main", fontSize: "40px" }} />
         </IconButton>
         <MuiDrawer open={open} onClose={handleClose}>
            <Sidebar drawer />
         </MuiDrawer>
      </div>
   );
};

export default Drawer;
