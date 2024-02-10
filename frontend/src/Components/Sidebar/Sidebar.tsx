import { useState } from 'react';
import * as S from './Style/Sidebar.style';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SidebarMenu from './Components/SidebarMenu';
import Logo from './Components/Logo';

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleSidebar = () => {
      setIsOpen((prev) => !prev);
   }

   return (
      <S.Sidebar isOpen={isOpen}>
         <IconButton onClick={toggleSidebar}>
            { isOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon /> }
         </IconButton>
         <Logo isOpen={isOpen} />
         <SidebarMenu isOpen={isOpen} />
      </S.Sidebar>
   )
}

export default Sidebar