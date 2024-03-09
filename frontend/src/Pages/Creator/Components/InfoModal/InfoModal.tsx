import { useAppDispatch, useAppSelector, useThunk } from '@/Core/Hooks';
import Modal from '@mui/material/Modal';
import { CreatorActions } from '../../Store/Creator.slice';
import * as S from '../../Style/Creator.style';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';

const InfoModal = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.Creator.isOpenInfoModal);
   const isEditing = useAppSelector((state) => state.Creator.isEditing);

   const { setIdle } = useThunk("createQuestions");
   const { setIdle: setIdleEditQuestions } = useThunk("editQuestions");

   const handleClose = () => {
      dispatch(CreatorActions.setIsOpenInfoModal("CLOSE"));
      if (isEditing) {
         setIdleEditQuestions();
      } else {
         setIdle(); 
         dispatch(CreatorActions.setIsEditing(true));
      }
   };

   return (
      <div>
         <Modal
            open={isOpen}
            disableEscapeKeyDown
         >
            <S.InfoModal>
               <Header handleClose={handleClose} />
               <Body />
               <Footer handleClose={handleClose} />
            </S.InfoModal>
         </Modal>
      </div>
   );
};

export default InfoModal;