import { Box, Stack, alpha, useTheme } from '@mui/material';
import * as S from './Style/Header.style';
import ProfileMenu from './Components/Menu';
import { useLocation } from 'react-router-dom';

const extract = (pathname: string): string => {
  if (pathname.includes('/')) {
    return pathname.split('/')[1];
  }
  return pathname;
};

const capitilize = (pathname: string): string => {
  const firstLetter = extract(pathname).charAt(0);
  const remainingLetters = extract(pathname).slice(1);
  return firstLetter.toUpperCase() + remainingLetters;
};

const Header = ({ is404 }: { is404: boolean; }) => {
  const { pathname } = useLocation();
  const theme = useTheme();

  const pageTitle = (() => {
    if (is404) {
      return 'Page Not Found';
    }

    switch (pathname) {
      case '/':
        return 'Home'
      case '/quiz':
        return (
          // TODO : Responsive
          <Box 
            bgcolor={alpha(theme.palette.error.light, 0.4)}
            color="error.main"
            padding="15px"
            borderRadius="10px"
            fontSize="16px"
          > 
            Check your time and be sure you complete the quiz!
          </Box>
        )
      case '/rules/quiz':
      case '/results/quiz':
        return capitilize(pathname);
      default:
        return `${capitilize(pathname)} Quizzes`;
    }
  })();

  return (
    <S.Header>
      <Stack flexDirection="row" height="100%">
        <S.PageTitle fontWeight="bold" variant="h4"> {pageTitle} </S.PageTitle>
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