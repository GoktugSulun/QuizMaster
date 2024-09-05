import { Typography } from '@mui/material';
import * as S from '../Style/Question.style';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

type TimeProps = {
   time: string | null;
}

const Time = (props: TimeProps) => {
   return (
      <S.Time 
         flexDirection="row" 
         alignItems="center" 
         gap={1}
      >
         <AccessAlarmIcon sx={{ width: 30, height: 30 }} color="primary" />
         <Typography 
            fontWeight="bold" 
            color="primary.main" 
            fontSize={25}
         > 
            {props.time} 
         </Typography>
      </S.Time>
   )
}

export default Time