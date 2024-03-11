import Modal from '@mui/material/Modal';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthEnums, RouteEnums } from '@/Constants/Enums';
import * as S from './Style/Auth.style';
import AuthHeader from './Components/AuthHeader';
import { Typography } from '@mui/material';
import { Login } from './Login';
import { Register } from './Register';

const Auth = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const params = useParams();
   const isOpenAuthModal = location.pathname.includes('/auth');
   
   const isLoginActive = params.type === AuthEnums.LOGIN;
   const isRegisterActive = params.type === AuthEnums.REGISTER;

   const handleClose = () => {
      const from = location.state?.from || RouteEnums.FEED;
      navigate(from, { replace: true });
   };

   if (params.type !== AuthEnums.LOGIN && params.type !== AuthEnums.REGISTER) {
      return <Navigate to={`/auth/${AuthEnums.LOGIN}`} replace />
   }

   return (
      <div>
         <Modal
            open={isOpenAuthModal}
            onClose={handleClose}
         >
            <S.Auth>
               <Typography
                  textAlign="center"
                  marginBottom="15px"
                  color="primary.main"
               >
                  Please <Typography component="span" color="primary.main" fontWeight="bold"> Login </Typography> to Continue
               </Typography>
               <AuthHeader />
               { isLoginActive && <Login /> }
               { isRegisterActive && <Register /> }
            </S.Auth>
         </Modal>
      </div>
   );
};

export default Auth;