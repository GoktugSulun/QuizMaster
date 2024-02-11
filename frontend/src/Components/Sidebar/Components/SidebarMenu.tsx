import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import * as S from '../Style/Sidebar.style';
import { ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomTooltip } from '@/Components/Tooltip';

const SidebarMenu = ({ isOpen }: { isOpen: boolean }) => {
   const location = useLocation();
   const navigate = useNavigate();
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
            title={isOpen ? "" : "Home"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname === '/'}  
               $isOpen={isOpen}
               onClick={() => navigate('/')}
               disableRipple
            >
               <ListItemIcon> <HomeIcon /> </ListItemIcon>
               <ListItemText> Home </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
         <CustomTooltip 
            title={isOpen ? "" : "Favorites"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname.includes('favorites')} 
               $isOpen={isOpen}
               onClick={() => navigateHandler('/favorites')}
               disableRipple
            >
               <ListItemIcon> <FavoriteIcon /> </ListItemIcon>
               <ListItemText> Favorites </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
         <CustomTooltip 
            title={isOpen ? "" : "Saved"} 
            placement="right" 
            arrow
         >
            <S.Item 
               $isActive={location.pathname === '/saved'} 
               $isOpen={isOpen}
               onClick={() => navigate('/saved')}
               disableRipple
            >
               <ListItemIcon> <BookmarkIcon /> </ListItemIcon>
               <ListItemText> Saved </ListItemText>
            </S.Item>
         </CustomTooltip>
         <Divider />
      </MenuList>
   );
};

export default SidebarMenu;