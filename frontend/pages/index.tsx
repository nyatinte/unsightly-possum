import { Box, Button, Container, Heading, Textarea } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledInput } from '../components/Input/ControlledInput';

export const schema = z.object({
  title: z
    .string()
    .min(1, 'タイトルを入力してください')
    .max(50, 'タイトルは50文字以内にしてください'),
  content: z.string().min(1, '内容を入力してください'),
  author: z
    .string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内にしてください'),
});

export type FormValues = z.infer<typeof schema>;
const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(form));
    reset();
  };

  return (
    <Container>
      <Head>
        <title>お知らせ配信ページ</title>
      </Head>

      <Heading my='8'>お知らせ配信ページ</Heading>
      <Box as='form' onSubmit={handleSubmit(onSubmit)} p='10' boxShadow='md'>
        <ControlledInput
          label='著者'
          errors={errors}
          isRequired
          {...register('author')}
        />
        <ControlledInput
          label='タイトル'
          errors={errors}
          isRequired
          {...register('title')}
        />
        <ControlledInput
          label='本文'
          isRequired
          errors={errors}
          as={Textarea}
          {...register('content')}
        />
        <Button
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          送信する
        </Button>
      </Box>
    </Container>
  );
};

export default Page;
