import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  forwardRef,
  FormControlProps,
  FormLabelProps,
  FormErrorMessageProps,
} from '@chakra-ui/react';
import { FieldErrorsImpl, Ref } from 'react-hook-form';

export type ControlledInputProps = {
  label: string;
  errors: Partial<FieldErrorsImpl<Record<string, unknown>>>;
  ref: Ref;
  isRequired?: boolean;
  formControlProps?: Omit<FormControlProps, 'isInvalid' | 'isRequired'>;
  formLabelProps?: FormLabelProps;
  formErrorMessageProps?: FormErrorMessageProps;
} & Omit<InputProps, 'isRequired'>;

export const ControlledInput = forwardRef<ControlledInputProps, 'input'>(
  (
    {
      label,
      errors,
      isRequired = false,
      formControlProps,
      formLabelProps,
      formErrorMessageProps,
      ...rest
    }: Omit<ControlledInputProps, 'ref'>,
    ref
  ) => {
    return (
      <FormControl
        isInvalid={Boolean(errors.name)}
        isRequired
        {...formControlProps}
      >
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        <Input {...rest} ref={ref} />
        <FormErrorMessage {...formErrorMessageProps}>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
    );
  }
);
