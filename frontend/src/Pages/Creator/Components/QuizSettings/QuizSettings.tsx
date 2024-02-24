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
import { useNavigate, useParams } from 'react-router-dom';

export type TimeType = {
   id: number; 
   name: string;
}

export type DefaultValuesType = {
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: File | null;
   minute: TimeType | null;
   second: TimeType | null;
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
   second: yup
      .object({ id: yup.number().required(), name: yup.string().required() })
      .nullable()
      .test("isValidSecondTime", "", (value, context) => {
         const val = value as TimeType | null;
         return (context.parent.minute?.name !== "00") || (val?.name !== "00")
      })
}));

const defaultValues: DefaultValuesType = {
   name: "",
   description: "",
   visibility: VisibilityEnums.PRIVATE,
   image: null,
   minute: { id: 1, name: "00"},
   second: { id: 1, name: "00"},
}

const QuizSettings = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const params = useParams();
   const isOpen = useAppSelector((state) => state.Creator.isOpenQuizSettingsModal);
   const form = useForm({ defaultValues, resolver, mode: "onChange" });

   const handleClose = () => {
      if (!params.quizId) {
         navigate('/', { replace: true });
      }
      dispatch(CreatorActions.setIsOpenQuizSettingsModal('CLOSE'));
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