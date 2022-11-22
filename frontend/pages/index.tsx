import { Box, Button, Container, Heading, Textarea } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RfcInput } from '../components/Input/RfcInput';

type formValues = {
  title: string;
  content: string;
  author: string;
};
const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formValues>();
  const onSubmit: SubmitHandler<formValues> = async (form) => {
    await setTimeout(() => {
      alert(JSON.stringify(form));
    }, 1000);
    reset();
  };

  return (
    <Container>
      <Head>
        <title>お知らせ配信ページ</title>
      </Head>

      <Box as='form' onSubmit={handleSubmit(onSubmit)}>
        <Heading my='8'>お知らせ配信ページ</Heading>
        <RfcInput
          label='著者'
          errors={errors}
          required
          {...register('author')}
        />
        <RfcInput
          label='タイトル'
          errors={errors}
          required
          {...register('title')}
        />
        <RfcInput
          label='本文'
          errors={errors}
          as={Textarea}
          required
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
