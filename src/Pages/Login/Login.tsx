import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useAppDispatch, useMaterialForm } from '../../Core/Hooks';
import { useNavigate } from 'react-router-dom';
import { snackbar } from '../../Core/Utils/Snackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type defaultValuesType = {
  email: string;
  password: string;
}

const defaultValues: defaultValuesType  = {
  email: '',
  password: ''
};

const resolver = yupResolver(
  yup.object({
    email: yup.string().required('Required!').min(4, 'Min 4 character'),
    password: yup.string().required('Required!').min(3, 'Min 3 character'),
  })
);

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, formState ,...form } = useForm<defaultValuesType>({ defaultValues, mode: "onChange",  resolver });
  // const { form, registerHandler } = useMaterialForm({ defaultValues, schema });

  console.log(form.getValues('email'), ' => email');
  console.log(formState.errors, ' => formState');

  const testHandler = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return snackbar('Invalid');
    }
    console.log('validdd => ', form.getValues());
  };


  return (
    <div>
      <label htmlFor="email"> Email </label>
      <input className="border mr-2" id="email" {...register("email")} />
      <p> {formState.errors["email"]?.message || ''} </p>
      <button className="bg-black text-white px-5 py-2 rounded-md" onClick={testHandler} > Test </button>
    </div>
  );
};

export default Login;