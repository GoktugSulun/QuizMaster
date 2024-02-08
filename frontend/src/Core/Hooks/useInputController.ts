import { type FieldPath, type FieldValues, useController, UseControllerReturn } from "react-hook-form";
import { type TextInputType, type CheckboxInputType } from "../Models";

type useInputController<T extends FieldValues, U extends FieldPath<T>> = 
   { inputType: 'Checkbox'; inputProps: CheckboxInputType<T, U> } 
      | { inputType: 'TextInput'; inputProps: TextInputType<T, U> };

type Sallama = { field: {
   value: string, 
   onChange: () => {},
   onBlur: () => {},
   name: string,
   ref: any,
}, 
fieldState: {
   error: boolean
}, }

export type Sallama2 = { field: {
   value: string, 
   onChange: () => {},
   onBlur: () => {},
   name: string,
   ref: any,
   disabled: boolean
}, fieldState: { error: boolean }, formState: {} }

export type DynamicReturn<T extends FieldValues, U extends FieldPath<T>, I extends string> = {
   controllers: UseControllerReturn<T, U>,
   others: I extends 'Checkbox' ? CheckboxInputType<T, U> : TextInputType<T, U>,
};

type Return<T extends FieldValues, U extends FieldPath<T>, I extends 'Checkbox' | 'TextInput'> = DynamicReturn<T, U, I>

const useInputController = <T extends FieldValues, U extends FieldPath<T>, I extends 'Checkbox' | 'TextInput'>(props: useInputController<T, U>)
: Return<T, U, I> => 
{
   const { name, control, ...otherProps } = props.inputProps;

   const controllers = control 
      ? useController({ name, control }) as UseControllerReturn<T, U>
      : { 
         field: {
            // value: props.inputProps.value, 
            // onChange: props.inputProps.onChange,
            // onBlur: props.inputProps.onBlur,
            // name: props.inputProps.name,
            // ref: props.inputProps.ref,
            value: 'aaaa', 
            onChange: () => {},
            onBlur: () => {},
            name: 'bbb',
            ref: null,
            disabled: false
         }, 
         fieldState: {
            // error: props.inputProps.error
            error: false
         },
         formState: {},
      } as Sallama2;

   
   return { controllers, others: props.inputProps } as Return<T, U, I>;
};

export default useInputController;

// const { 
   //    field: { value, onChange, onBlur, name, ref },
   //    fieldState: { error },
   //    checkbox,
   //    ...otherProps
   // } = useInputController({ inputType: 'Checkbox', inputProps: props });