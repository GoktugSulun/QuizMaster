import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <Stack sx={{ margin: 10 }} direction="row" spacing={5}>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
        <Link to="/test"> Test </Link>
      </Stack>
    </div>
  )
}

export default Dashboard