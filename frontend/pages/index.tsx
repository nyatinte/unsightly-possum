import { Box, Button, Container, Heading, Textarea } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Schema, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledInput } from '../components/Input/ControledInput';

const schema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  author: z.string().min(1).max(10),
});

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (form) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(form));
    reset();
  };

  return (
    <Container>
      <Head>
        <title>お知らせ配信ページ</title>
      </Head>

      <Box as='form' onSubmit={handleSubmit(onSubmit)}>
        <Heading my='8'>お知らせ配信ページ</Heading>
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
