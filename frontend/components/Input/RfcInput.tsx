import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  forwardRef,
} from '@chakra-ui/react';
import { FieldErrorsImpl } from 'react-hook-form';

type RfcInputProps = {
  label: string;
  errors: Partial<FieldErrorsImpl<Record<string, unknown>>>;
  required?: boolean;
} & InputProps;
/**
 * @Props
 * label: ラベル
 * errors: react-hook-formのエラー
 * required: 必須かどうか
 */
export const RfcInput = forwardRef<RfcInputProps, 'input'>(
  ({ label, name, errors, required, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errors.name)} isRequired={required}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input id={name} ref={ref} {...rest} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
    );
  }
);
