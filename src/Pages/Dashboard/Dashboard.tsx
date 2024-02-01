import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import * as S from './Dashboard.style';
import { useEffect } from 'react';
import { snackbar } from '@/Core/Utils';

const Dashboard = () => {

  return (
    <S.Dashboard>
      <Stack>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
        <Link to="/test"> Test </Link>
      </Stack>
    </S.Dashboard>
  )
}

export default Dashboard