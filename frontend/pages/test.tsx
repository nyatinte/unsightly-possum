import { Button, Container, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ControlledInput } from '../components/Input/ControlledInput';

export const schema = z.object({
  name: z.string().min(3, '名前は3文字以上で入力してください'),
  email: z.string().email('メールアドレスの形式が正しくありません'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  description: z
    .string()
    .max(100, '自己紹介は100文字以内にしてください')
    .optional(),
});
export type FormValues = z.infer<typeof schema>;
const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = (form) => {
    console.log(form);
    reset();
  };
  return (
    <Container as='form' p='10' boxShadow='md' borderRadius='md'>
      <ControlledInput
        label='ユーザー名'
        errors={errors}
        isRequired
        {...register('name')}
      />
      <ControlledInput
        label='メールアドレス'
        type='email'
        errors={errors}
        isRequired
        {...register('email')}
      />
      <ControlledInput
        label='パスワード'
        errors={errors}
        isRequired
        type='password'
        {...register('password')}
      />
      <ControlledInput
        label='自己紹介'
        errors={errors}
        as={Textarea}
        {...register('description')}
      />
      <Button onClick={handleSubmit(onSubmit)}>送信</Button>
    </Container>
  );
};

export default Page;
