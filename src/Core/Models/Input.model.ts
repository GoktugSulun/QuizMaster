import { type CheckboxProps, type FormControlLabelProps, type OutlinedInputProps } from "@mui/material"
import { type UseControllerProps, type Control, type FieldPath, type FieldValues } from "react-hook-form"

// Common Types ---- [Start]
// Controlled input by React-hook-form
type ControlledInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
   control: Control<TFieldValues>, 
   name: TName,
   onChange?: never,
   onBlur?: never,
   ref?: never,
   value?: never
}

// Normal MUI input, not controlled by React-hook-form
type UncontrolledInput = {
   control?: undefined,
   name?: string
}

// Omit "control" and "name" prop from UseControllerProps
type OmittedUseControllerProps<TFieldValues extends FieldValues> = Omit<UseControllerProps<TFieldValues>, 'name' | 'control'>

// Controlled or Uncontrolled input by React-hook-form
type ControlType<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = OmittedUseControllerProps<TFieldValues> & (ControlledInput<TFieldValues, TName> | UncontrolledInput);
// Common Types ---- [End]


// TextInput Types ---- [Start]
type TextInputProps = {
   helperText?: string, 
   shrink?: boolean
}

export type TextInputType<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = 
   & TextInputProps 
   & OutlinedInputProps
   & ControlType<TFieldValues, TName>;
// TextInput Types ---- [End]

// Checkbox Types ---- [Start]
type CheckboxInputProps = {
   checkbox: CheckboxProps, 
   helperText?: string, 
   error?: boolean
}

export type CheckboxInputType<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = 
   Omit<FormControlLabelProps, 'control'> 
   & CheckboxInputProps 
   & ControlType<TFieldValues, TName>;
// Checkbox Types ---- [End]