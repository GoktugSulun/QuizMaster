import * as S from '../../Style/Creator.style';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { CreatorActions } from '../../Store/Creator.slice';
import Header from './Components/Header';

const QuizSettings = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.Creator.isOpenQuizSettingsModal);

   const handleClose = () => {
      dispatch(CreatorActions.setIsOpenQuizSettingsModal('CLOSE'))
   }

   return (
      <div>
         <Modal
            open={isOpen}
            onClose={handleClose}
         >
            <S.QuizSettings>
               <Header handleClose={handleClose} />
            </S.QuizSettings>
         </Modal>
      </div>
   );
};

export default QuizSettings;