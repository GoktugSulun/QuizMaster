import LogoURL from '@/Pngs/logo.png';
import * as S from '../Style/Sidebar.style';
import { Typography } from '@mui/material';

const Logo = ({ isOpen } : { isOpen: boolean }) => {

   return (
      <S.Logo>
         <img src={LogoURL} alt="logo" />
         <Typography 
            color="primary.main" 
            variant="h5"
            fontWeight="bold"
         > 
            { isOpen ? 'QuizMaster' : 'QM'} 
         </Typography>
      </S.Logo>
   )
}

export default Logo