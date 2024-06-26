import Modal from '@mui/material/Modal';
import { StyledQuizSessionInfoModal } from '../../Style/QuizRules.style';
import QuizSessionInfoModalHeader from './QuizSessionInfoModalHeader';
import { useAppSelector } from '@/Core/Hooks';
import { useDispatch } from 'react-redux';
import { QuizRulesActions } from '../../Store/QuizRules.slice';
import { Divider } from '@mui/material';
import QuizSessionInfoModalBody from './QuizSessionInfoModalBody';
import QuizSessionInfoModalFooter from './QuizSessionInfoModalFooter';

//* This modal is open when the status is TIMEOUT or EXCEED_ATTEMPT 
const QuizSessionInfoModal = () => {
   const dispatch = useDispatch();
   const isOpen = useAppSelector((state) => state.QuizRules.isOpenSessionInfoModal)

   const handleClose = () => {
      dispatch(QuizRulesActions.setIsOpenSessionModal('CLOSE'))
   }

   return (
      <div>
         <Modal
            open={isOpen}
            onClose={handleClose}
         >
            <StyledQuizSessionInfoModal>
               <QuizSessionInfoModalHeader handleClose={handleClose} />
               <Divider sx={{ marginTop: "10px" }} />
               <QuizSessionInfoModalBody />
               <Divider sx={{ marginBottom: "10px" }} />
               <QuizSessionInfoModalFooter handleClose={handleClose} />
            </StyledQuizSessionInfoModal>
         </Modal>
      </div>
   );
}

export default QuizSessionInfoModal;
