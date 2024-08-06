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
import { useEffect } from 'react';

type SidebarProps = { 
   drawer?: boolean; 
}

const Sidebar = (props: SidebarProps) => {
   const dispatch = useAppDispatch();
   const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);

   const toggleSidebar = () => {
      dispatch(AppConfigActions.setIsOpenSidebar("TOGGLE"));
   }

   useEffect(() => {
      if (props.drawer){
         dispatch(AppConfigActions.setIsOpenSidebar("OPEN"))
      }
   }, [props.drawer])

   return (
      <S.Sidebar isOpen={isOpenSidebar} drawer={props.drawer} >
         <Box>
            { 
               !props.drawer 
                  && (
                     <CustomTooltip arrow title={isOpenSidebar ? "Close Sidebar" : "Open Sidebar"}>
                        <IconButton className="toggle" onClick={toggleSidebar}>
                           { isOpenSidebar ? <ArrowBackIcon /> : <ArrowForwardIcon /> }
                        </IconButton>
                     </CustomTooltip>
                  ) 
            }
            <Logo />
         <Menu drawer />
         </Box>
         <Stack flex={1} justifyContent="flex-end">
            <CreateQuiz drawer />
         </Stack>
      </S.Sidebar>
   )
}

export default Sidebar