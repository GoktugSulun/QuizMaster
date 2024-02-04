import { Stack, Typography } from '@mui/material';
import * as S from './Style/Header.style';
import ProfileMenu from './Components/Menu';

const Header = () => {

  return (
    <S.Header>
      <Stack flexDirection="row" height="100%">
        <S.Logo variant="h3"> QUIZZZ </S.Logo>
        <Stack 
          flex={1}
          flexDirection="row" 
          justifyContent="flex-end" 
          alignItems="center"
          spacing={5} 
          height="100%"
          paddingRight={5}
        >
          <ProfileMenu />
        </Stack>
      </Stack>
    </S.Header>
  )
}

export default Header