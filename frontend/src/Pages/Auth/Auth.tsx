import Modal from '@mui/material/Modal';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthEnums, RouteEnums } from '@/Constants/Enums';
import * as S from './Style/Auth.style';
import AuthHeader from './Components/AuthHeader';
import { Button } from '@mui/material';

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

   const go = () => {
      const to = location.state?.to;
      console.log(to, ' to');
      localStorage.setItem("token", "aaaa")
      
      if (to) {
         navigate(to, { replace: true });
         return;
      }
      navigate(-1);
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
               <AuthHeader />
               <Button onClick={go}> Login </Button>
               { isLoginActive && "Login component" }
               { isRegisterActive && "Register component" }
            </S.Auth>
         </Modal>
      </div>
   );
};

export default Auth;