import * as S from '../../Style/Creator.style';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '@/Core/Hooks';
import { CreatorActions } from '../../Store/Creator.slice';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import { FormProvider, useForm } from 'react-hook-form';
import { VisibilityEnums } from '../../Types/CreatorTypes';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { formatTime } from '@/Core/Helper';

export type TimeType = {
   id: number; 
   name: string;
}

export type DefaultValuesType = {
   name: string;
   description: string;
   totalAttempt: number;
   visibility: VisibilityEnums;
   image: File | null;
   minute: TimeType | null;
   second: TimeType | null;
}

const schema = yup.object({
   name: yup
      .string()
      .trim()
      .min(3, "Name must have minimum 3 characters")
      .max(40, "Name must have maximum 40 characters")
      .required("Name required"),
   description: yup
      .string()
      .trim()
      .min(10, "Description must have minimum 10 characters")
      .max(150, "Description must have maximum 150 characters")
      .required("Description required"),
   totalAttempt: yup
      .number()
      .required(),
   visibility: yup
      .mixed()
      .required()
      .oneOf(Object.values(VisibilityEnums)),
   image: yup
      .mixed()
      .nullable(),
   minute: yup
      .object({ id: yup.number().required(), name: yup.string().required() })
      .nullable(),
   second: yup
      .object({ id: yup.number().required(), name: yup.string().required() })
      .nullable()
      .test("isValidSecondTime", "", (value, context) => {
         const val = value as TimeType | null;
         return (context.parent.minute?.name !== "00") || (val?.name !== "00")
      }),
}) as yup.ObjectSchema<DefaultValuesType>;

const defaultValues: DefaultValuesType = {
   name: "",
   description: "",
   totalAttempt: 1,
   visibility: VisibilityEnums.PRIVATE,
   image: null,
   minute: { id: 0, name: "00"},
   second: { id: 0, name: "00"},
}

const QuizSettings = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const params = useParams();
   const isOpenQuizSettingsModal = useAppSelector((state) => state.Creator.isOpenQuizSettingsModal);
   const quiz = useAppSelector((state) => state.Creator.quiz);
   const form = useForm<DefaultValuesType>({ defaultValues, resolver: yupResolver(schema), mode: "onChange" });

   const handleClose = () => {
      if (!params.quizId) {
         navigate('/', { replace: true });
         return;
      }
      dispatch(CreatorActions.setIsOpenQuizSettingsModal('CLOSE'));
   }

   useEffect(() => {
      if (isOpenQuizSettingsModal && quiz.id) {
         const { minute, second } = formatTime(quiz.totalTime);
         form.reset({
            name: quiz.name,
            description: quiz.description,
            totalAttempt: quiz.totalAttempt,
            visibility: VisibilityEnums.PRIVATE,
            image: null,
            minute,
            second,
         });
      }  
   }, [isOpenQuizSettingsModal]);

   return (
      <FormProvider {...form}>
         <Modal
            open={isOpenQuizSettingsModal}
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