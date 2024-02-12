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
import { useAppSelector } from '@/Core/Hooks';

const Menu = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);
   const queryParams = new URLSearchParams(location.search);

   const navigateHandler = (url: string) => {
      queryParams.set("page", "1");
      queryParams.set("limit", "10");

      const newSearch = `?${queryParams.toString()}`;
      navigate({ pathname: url, search: newSearch });
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
               $isActive={location.pathname === '/'}  
               $isOpen={isOpenSidebar}
               onClick={() => navigate('/')}
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
               $isActive={location.pathname.includes('favorites')} 
               $isOpen={isOpenSidebar}
               onClick={() => navigateHandler('/favorites')}
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
               $isActive={location.pathname === '/saved'} 
               $isOpen={isOpenSidebar}
               onClick={() => navigate('/saved')}
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
               $isActive={location.pathname === '/completed'} 
               $isOpen={isOpenSidebar}
               onClick={() => navigate('/completed')}
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
               $isActive={location.pathname === '/created'} 
               $isOpen={isOpenSidebar}
               onClick={() => navigate('/created')}
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