import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import * as S from '../Style/Sidebar.style';
import AddIcon from '@mui/icons-material/Add';
import { CustomTooltip } from "@/Components/Tooltip";
import { useAppDispatch, useAppSelector } from "@/Core/Hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { AppConfigActions } from "@/Core/Store/AppConfig.slice";

type CreateQuizProps = {
  drawer?: boolean;
}

const CreateQuiz = ({ drawer }: CreateQuizProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isOpenSidebar = useAppSelector((state) => state.AppConfig.isOpenSidebar);

  const navigateToCreator = () => {
    if (drawer) {
      dispatch(AppConfigActions.setIsOpenDrawer("CLOSE"))
    }
    if (location.pathname !== '/creator') {
      const token = localStorage.getItem("token");
      if (!token) {
         navigate("/auth/login", { state: { from: location.pathname, authLocation: location, to: '/creator' } });
      } else {
         navigate('/creator');
      }
   }
  };

  if (!isOpenSidebar) {
    return (
      <S.CreateQuizResponsive>
        <CustomTooltip 
            title="Create Your Quiz"
            arrow
            placement="right"
          >
            <IconButton onClick={navigateToCreator}>
              <AddIcon fontSize="large" />
            </IconButton>
          </CustomTooltip>
      </S.CreateQuizResponsive>
    )
  }

  return (
    <Box
      bgcolor="custom.light"
      width="calc(100% - 30px)"
      margin="15px"
      borderRadius="5px"
      padding="40px 10px 10px"
      boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      position="relative"
    >
      <S.CreateQuizLogoWrapper>
        <S.CreateQuizLogo>
          <CustomTooltip 
            title="Create Your Quiz"
            arrow
            placement="top"
          >
            <IconButton onClick={navigateToCreator}>
              <AddIcon fontSize="large" />
            </IconButton>
          </CustomTooltip>
        </S.CreateQuizLogo>
      </S.CreateQuizLogoWrapper>
      <Typography
        fontWeight="bold"
        color="primary.main"
        fontSize="20"
        textAlign="center"
      > 
        Become a Quiz Creator 
      </Typography>
      <Typography 
        paragraph
        textAlign="center"
        margin="15px 0"
        lineHeight="20px"
        fontSize="14px"
      >
        Create a quiz to test your students, friends or so on, or just for fun.
      </Typography>
      <Stack alignItems="center">
        <Button onClick={navigateToCreator}> Create Your Quiz </Button>
      </Stack>
    </Box>
  )
}

export default CreateQuiz