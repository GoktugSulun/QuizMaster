import Modal from '@mui/material/Modal';
import { StyledQuizSessionInfoModal } from '../../Style/QuizRules.style';
import QuizSessionInfoModalHeader from './QuizSessionInfoModalHeader';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { QuizRulesActions } from '../../Store/QuizRules.slice';
import { Divider } from '@mui/material';
import QuizSessionInfoModalBody from './QuizSessionInfoModalBody';
import QuizSessionInfoModalFooter from './QuizSessionInfoModalFooter';
import { useNavigate } from 'react-router-dom';
import { RouteEnums } from '@/Constants/Enums';

type QuizSessionInfoModalProps = {
   isQuizPage?: boolean;
}

//* This modal is open when the status is TIMEOUT or EXCEED_ATTEMPT 
const QuizSessionInfoModal = (props: QuizSessionInfoModalProps) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const isOpen = useAppSelector((state) => state.QuizRules.isOpenSessionInfoModal)

   const handleClose = (navigateBack?: boolean) => {
      dispatch(QuizRulesActions.setIsOpenSessionModal('CLOSE'))
      if (navigateBack) {
         navigate(RouteEnums.FEED, { replace: true });
      }
   }

   return (
      <div>
         <Modal
            open={isOpen}
            onClose={() => handleClose(props.isQuizPage)}
         >
            <StyledQuizSessionInfoModal>
               <QuizSessionInfoModalHeader isQuizPage={props.isQuizPage} handleClose={handleClose} />
               <Divider sx={{ marginTop: "10px" }} />
               <QuizSessionInfoModalBody />
               <Divider sx={{ marginBottom: "10px" }} />
               <QuizSessionInfoModalFooter isQuizPage={props.isQuizPage} handleClose={handleClose} />
            </StyledQuizSessionInfoModal>
         </Modal>
      </div>
   );
}

export default QuizSessionInfoModal;
