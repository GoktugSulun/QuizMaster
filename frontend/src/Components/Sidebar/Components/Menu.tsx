import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import * as S from '../Style/Sidebar.style';
import { ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomTooltip } from '@/Components/Tooltip';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { RouteEnums } from '@/Constants/Enums';
import useAuth from '@/Hooks/useAuth';
import { AppConfigActions } from '@/Core/Store/AppConfig.slice';

type MenuProps = {
   drawer?: boolean;
}

const Menu = ({ drawer }: MenuProps) => {
   const dispatch = useAppDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);

   const { isAuthorized } = useAuth();

   const navigateHandler = (targetPath: string) => {
      if (drawer) {
         dispatch(AppConfigActions.setIsOpenDrawer("CLOSE"))
      }
      if (location.pathname !== targetPath) {
         if (isAuthorized) {
            navigate(targetPath);
         } else {
            navigate("/auth/login", { state: { from: location.pathname, authLocation: location, to: targetPath } });
         }
      }
   }

   return (
      <MenuList sx={{ width: '100%', overflow: 'hidden' }}>
         <Divider />
         <CustomTooltip 
            title={isOpenSidebar ? "" : "Home"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname === RouteEnums.FEED} 
               $isOpen={isOpenSidebar}
               onClick={() => navigateHandler(RouteEnums.FEED)}
               disableRipple
            >
               <ListItemIcon> <HomeIcon /> </ListItemIcon>
               <ListItemText> Home </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
         <CustomTooltip 
            title={isOpenSidebar ? "" : "Favorites"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname === RouteEnums.FAVORITES} 
               $isOpen={isOpenSidebar}
               onClick={() => navigateHandler(RouteEnums.FAVORITES)}
               disableRipple
            >
               <ListItemIcon> <FavoriteIcon /> </ListItemIcon>
               <ListItemText> Favorites </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
         <CustomTooltip 
            title={isOpenSidebar ? "" : "Saved"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname === RouteEnums.SAVED} 
               $isOpen={isOpenSidebar}
               onClick={() => navigateHandler(RouteEnums.SAVED)}
               disableRipple
            >
               <ListItemIcon> <BookmarkIcon /> </ListItemIcon>
               <ListItemText> Saved </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
         <CustomTooltip 
            title={isOpenSidebar ? "" : "Completed"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname === RouteEnums.COMPLETED} 
               $isOpen={isOpenSidebar}
               onClick={() => navigateHandler(RouteEnums.COMPLETED)}
               disableRipple
            >
               <ListItemIcon> <AssignmentTurnedInIcon /> </ListItemIcon>
               <ListItemText> Completed </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
         <CustomTooltip 
            title={isOpenSidebar ? "" : "Created"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname === RouteEnums.CREATED} 
               $isOpen={isOpenSidebar}
               onClick={() => navigateHandler(RouteEnums.CREATED)}
               disableRipple
            >
               <ListItemIcon> <FolderIcon /> </ListItemIcon>
               <ListItemText> Created </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
      </MenuList>
   );
};

export default Menu;
