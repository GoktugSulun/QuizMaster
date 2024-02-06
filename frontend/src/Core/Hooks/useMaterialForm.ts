import { UseFormProps, useForm, FieldValues } from 'react-hook-form';

type UseMaterialFormProps<T extends FieldValues> = UseFormProps<T>;

const useMaterialForm = <T extends FieldValues>(
  { defaultValues, resolver, mode = 'onSubmit', reValidateMode = 'onChange'}: UseMaterialFormProps<T>
) => {
  
  const { register, ...form } = useForm({
    defaultValues,
    resolver,
    mode,
    reValidateMode,
  });

  const registerHandler = (name: keyof T) => {
    return {
      name,
      control: form.control
    }
  }

  return { form, registerHandler };
};

export default useMaterialForm