import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import * as S from '../Style/Sidebar.style';
import { ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

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
      <MenuList sx={{ width: '100%', overflow: 'hidden' }} >
         <S.Item 
            $isActive={location.pathname === '/'}  
            $isOpen={isOpen}
            onClick={() => navigate('/')}
         >
            <ListItemIcon> <HomeIcon /> </ListItemIcon>
            <ListItemText> Anasayfa </ListItemText>
         </S.Item>
         <Divider />
         <S.Item 
            $isActive={location.pathname.includes('favorites')} 
            $isOpen={isOpen}
            onClick={() => navigateHandler('/favorites')}
         >
            <ListItemIcon> <FavoriteIcon /> </ListItemIcon>
            <ListItemText> Favoriler </ListItemText>
         </S.Item>
         <Divider />
         <S.Item 
            $isActive={location.pathname === '/saves'} 
            $isOpen={isOpen}
            onClick={() => navigate('/saves')}
         >
            <ListItemIcon> <BookmarkIcon /> </ListItemIcon>
            <ListItemText> Kaydedilenler </ListItemText>
         </S.Item>
         <Divider />
      </MenuList>
   );
};

export default SidebarMenu;