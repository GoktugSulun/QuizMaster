import { useState } from 'react';
import * as S from './Style/Sidebar.style';
import { IconButton, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SidebarMenu from './Components/SidebarMenu';
import Logo from './Components/Logo';

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(true);

   const toggleSidebar = () => {
      setIsOpen((prev) => !prev);
   }

   return (
      <S.Sidebar isOpen={isOpen}>
         <IconButton onClick={toggleSidebar}>
            { isOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon /> }
         </IconButton>
         <Logo isOpen={isOpen} />
         <Typography 
            fontWeight="bold" 
            color="primary.main" 
            fontSize={18}
            padding="0 30px"
         > 
            Quizzes 
         </Typography>
         <SidebarMenu isOpen={isOpen} />
      </S.Sidebar>
   )
}

export default Sidebar