import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TOAST_OPTION } from '@/constants/toast.constants';
import { useCreatePostMutation } from '@/services/postApi';

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
  const [createPost, { isLoading }] = useCreatePostMutation(); // 게시글 작성 API
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Post> = async (formData) => {
    try {
      const { error } = await createPost(formData);
      toast.success('게시글 작성에 성공했습니다.', TOAST_OPTION);
      navigate('/posts');

      if (error) {
        console.error(error);
        toast.error('게시글 작성에 실패했습니다.', TOAST_OPTION);
      }
    } catch (error) {
      console.error(error);
      toast.error('게시글 작성에 실패했습니다.', TOAST_OPTION);
    }
  };

  return (
    <section
      onSubmit={handleSubmit(onSubmit)}
      className='mt-5 inline-block w-full'
    >
      <form className='mx-auto max-w-screen-lg'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-bold'>게시글 작성하기</h3>
          <Button
            type='submit'
            disabled={!isValid}
            isLoading={isLoading}
            className='w-[100px]'
          >
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
