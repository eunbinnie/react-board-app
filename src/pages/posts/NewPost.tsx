import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { Post } from '@/types/post.types';

import Button from '@/components/button/Button';
import PostContent from '@/components/post/PostContent';
import PostInput from '@/components/post/PostInput';

const NewPostPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Post>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Post> = async (data) => {
    console.log(data);
  };

  return (
    <section
      onSubmit={handleSubmit(onSubmit)}
      className='mt-5 inline-block w-full'
    >
      <form className='mx-auto max-w-screen-lg'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-bold'>게시글 작성하기</h3>
          <Button type='submit' disabled={!isValid} className='w-fit'>
            등록하기
          </Button>
        </div>
        <div className='mt-10 grid gap-5'>
          <PostInput
            id='title'
            name='title'
            label='제목'
            placeholder='제목을 입력해 주세요'
            register={register}
          />
          <PostInput
            id='author'
            name='author'
            label='작성자'
            placeholder='작성자를 입력해 주세요'
            register={register}
          />
          <PostContent
            id='content'
            name='content'
            label='내용'
            placeholder='내용을 입력해 주세요'
            register={register}
          />
        </div>
      </form>
    </section>
  );
};

export default NewPostPage;
