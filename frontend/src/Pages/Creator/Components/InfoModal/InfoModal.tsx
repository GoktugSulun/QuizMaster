import { useAppDispatch, useAppSelector, useThunk } from '@/Core/Hooks';
import { CreatorActions } from '../../Store/Creator.slice';
import Body from './Components/Body';
import { BaseModal } from '@/Core/Components';
import { useNavigate } from 'react-router-dom';
import { RouteEnums } from '@/Constants/Enums';
import { useMemo } from 'react';

const InfoModal = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const isOpen = useAppSelector((state) => state.Creator.isOpenInfoModal);
   const isEditing = useAppSelector((state) => state.Creator.isEditing);

   const { isLoading: isLoadingCreate, isSuccess: isSuccessCreate, isError: isErrorCreate, setIdle: setIdleCreateQuestions } = useThunk("createQuestions");
   const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, isError: isErrorEdit, setIdle: setIdleEditQuestions } = useThunk("editQuestions");
   const isLoading = isLoadingCreate || isLoadingEdit;
   const isSuccess = isSuccessCreate || isSuccessEdit;
   const isError = isErrorCreate || isErrorEdit;

   const handleClose = () => {
      dispatch(CreatorActions.setIsOpenInfoModal("CLOSE"));
      if (isEditing) {
         setIdleEditQuestions();
      } else {
         setIdleCreateQuestions(); 
         dispatch(CreatorActions.setIsEditing(true));
      }
   };

   const navigateToHome = () => {
      navigate(RouteEnums.FEED);
   }

   const title = useMemo(() => {
      if (isLoading) {
         return "Saving..."
      }
      if (isSuccess) {
         return "Success"
      }
      if (isError) {
         return "Error"
      }
      return "Saving..."
   }, [isLoading, isSuccess, isError]);

   return (
      <div>
         <BaseModal
            open={isOpen}
            handleClose={handleClose}
            disableCloseButton={isLoading}
            title={title}
            firstButtonName='Stay Here'
            firstButtonOnClick={handleClose}
            disableFirstButton={isLoading}
            secondButtonName='Go Home Page'
            secondButtonOnClick={navigateToHome}
            disableSecondButton={isLoading}
         >
            <Body />
         </BaseModal>
      </div>
   );
};

export default InfoModal;