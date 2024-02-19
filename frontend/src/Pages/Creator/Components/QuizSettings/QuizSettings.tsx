import * as S from '../../Style/Creator.style';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { CreatorActions } from '../../Store/Creator.slice';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import { FormProvider, useForm } from 'react-hook-form';
import { VisibilityEnums } from '../../Model/Creator.model';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider } from '@mui/material';

type DefaultValuesType = {
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: File | null
}

const resolver = yupResolver(yup.object({
   name: yup
      .string()
      .trim()
      .min(3, "Name must have minimum 3 characters")
      .required("Name required"),
   description: yup
      .string()
      .trim()
      .min(10, "Description must have minimum 10 characters")
      .required("Description required"),
}));

const defaultValues: DefaultValuesType = {
   name: "",
   description: "",
   visibility: VisibilityEnums.PRIVATE,
   image: null
}

const QuizSettings = () => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.Creator.isOpenQuizSettingsModal);
   const form = useForm({ defaultValues, resolver, mode: "onChange" });

   const handleClose = () => {
      dispatch(CreatorActions.setIsOpenQuizSettingsModal('CLOSE'))
   }

   return (
      <FormProvider {...form}>
         <Modal
            open={isOpen}
            onClose={handleClose}
         >
            <S.QuizSettings>
               <Header handleClose={handleClose} />
               <Divider sx={{ margin: "0 25px 0" }} />
               <Body />
               <Divider sx={{ margin: "0 25px 0" }} />
               <Footer handleClose={handleClose} />
            </S.QuizSettings>
         </Modal>
      </FormProvider>
   );
};

export default QuizSettings;