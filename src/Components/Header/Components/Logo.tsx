import * as S from '../Style/Header.style';
import LogoImg from '../../../../public/logo.jpg';
import { IconButton } from '@mui/material';

const Logo = () => {
  return (
    <S.Logo variant='h4' >
      <IconButton disableRipple>
        <img width={200} height={50} style={{ objectFit: 'cover' }} src={LogoImg} alt="Logo" />
      </IconButton>
    </S.Logo>
  )
}

export default Logo