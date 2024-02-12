import LogoURL from '@/Pngs/logo.png';
import * as S from '../Style/Sidebar.style';
import { Typography } from '@mui/material';
import { useAppSelector } from '@/Core/Hooks';

const Logo = () => {
   const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);

   return (
      <S.Logo>
         <img src={LogoURL} alt="logo" />
         <Typography 
            color="primary.main" 
            variant="h5"
            fontWeight="bold"
         > 
            { isOpenSidebar ? 'QuizMaster' : 'QM'} 
         </Typography>
      </S.Logo>
   )
}

export default Logo