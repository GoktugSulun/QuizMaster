import * as S from './Style/Sidebar.style';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import Menu from './Components/Menu';
import Logo from './Components/Logo';
import CreateQuiz from './Components/CreateQuiz';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { AppConfigActions } from '@/Core/Store/AppConfig.slice';
import { CustomTooltip } from '../Tooltip';

const Sidebar = () => {
   const dispatch = useAppDispatch();
   const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);

   const toggleSidebar = () => {
      dispatch(AppConfigActions.setIsOpenSidebar("TOGGLE"));
   }

   return (
      <S.Sidebar isOpen={isOpenSidebar}>
         <Box>
            <CustomTooltip arrow title={isOpenSidebar ? "Close Sidebar" : "Open Sidebar"}>
               <IconButton className="toggle" onClick={toggleSidebar}>
                  { isOpenSidebar ? <ArrowBackIcon /> : <ArrowForwardIcon /> }
               </IconButton>
            </CustomTooltip>
            <Logo />
         <Menu />
         </Box>
         <Stack flex={1} justifyContent="flex-end">
            <CreateQuiz />
         </Stack>
      </S.Sidebar>
   )
}

export default Sidebar