import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import * as S from './Style/Header.style';
import ProfileMenu from './Components/Menu';
import { useLocation, useParams } from 'react-router-dom';
import CreatorInput from './Components/CreatorInput';
import CreatorButtons from './Components/CreatorButtons';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import useAuth from '@/Hooks/useAuth';
import AuthButtons from './Components/AuthButtons';
import Drawer from './Components/Drawer';
import { useEffect } from 'react';
import { AppConfigActions } from '@/Core/Store/AppConfig.slice';

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

const Header = ({ is404=false }: { is404?: boolean; }) => {
  const { pathname } = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isCreatorPage = pathname.includes('/creator');
  const doesQuizIdExist = !!useAppSelector((state) => state.Creator.quiz.id);
  const quizName = useAppSelector((state) => state.Quiz.quiz.name);
  const isBelowLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const isUpLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const isUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const { isAuthorized } = useAuth();

  // Todo: manage from ProdtectedRoute with prop maybe
  const pageTitle = (() => {
    if (is404) {
      return 'Page Not Found';
    }
    
    if (isCreatorPage) {
      return capitilize(pathname);
    }
    
    switch (pathname) {
      case '/feed':
        return 'All Quizzes'
      case '/quiz':
        return quizName
      case '/profile':
        return "Profile"
      case '/rules/quiz':
      case '/results/quiz':
        return capitilize(pathname);
      default:
        return `${capitilize(pathname)} Quizzes`;
    }
  })();

  useEffect(() => {
    if (isUpLg) {
      dispatch(AppConfigActions.setIsOpenDrawer('CLOSE'));
    }
  }, [isUpLg])

  return (
    <S.HeaderWrapper>
      <Box sx={{ backdropFilter: "blur(2px)", height: "10px" }} />
      <S.Header>
        <Stack flexDirection="row" height="100%">
          <Stack flexDirection="row" alignItems="center">
            { isBelowLg && <Drawer /> }
            <S.PageTitle 
              fontWeight="bold" 
              variant={isUpSm ? "h4" : "h5"}
              sx={{ padding: isUpSm ? '0 40px' : '0 10px' }}
            > 
              {pageTitle} 
            </S.PageTitle> 
            { isCreatorPage && isUpLg && doesQuizIdExist && params.quizId && <CreatorInput /> }
          </Stack>
          <Stack 
            flex={1}
            flexDirection="row" 
            justifyContent="flex-end" 
            alignItems="center"
            gap={2}
            height="100%"
            paddingRight={5}
          >
            { isCreatorPage && isUpLg && doesQuizIdExist && params.quizId && <CreatorButtons /> }
            { isAuthorized ? <ProfileMenu /> : <AuthButtons />}
          </Stack>
        </Stack>
      </S.Header>
    </S.HeaderWrapper>
  )
}

export default Header