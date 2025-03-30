import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TOAST_OPTION } from '@/constants/toast.constants';
import {
  useDeletePostMutation,
  useGetPostDetailQuery,
} from '@/services/postApi';
import type { RootState } from '@/store/store';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';

import ArrowLeft from '/icons/arrow-left.svg';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const { data, error } = useGetPostDetailQuery({ id });
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const isAuthor = user?.id === data?.user_id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (error) {
    console.error(error);
  }

  const handleDeletePost = async () => {
    try {
      await deletePost({ id }).unwrap();
      toast.success('게시글이 삭제되었습니다.', TOAST_OPTION);
      navigate('/posts');
    } catch (err) {
      console.error('삭제 실패:', err);
      toast.error('게시글 삭제에 실패했습니다.', TOAST_OPTION);
    }
  };

  return (
    <>
      <section className='mt-5 inline-block w-full'>
        <div className='mx-auto max-w-screen-lg'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center text-sm leading-none text-gray-400'
            >
              <img src={ArrowLeft} alt='뒤로가기 아이콘' />
              <span>뒤로가기</span>
            </button>
            {isAuthor && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className='w-[100px]'
                isLoading={isLoading}
              >
                삭제
              </Button>
            )}
          </div>
          {isAuthenticated ? (
            <div className='mt-5 grid gap-8'>
              <div className='grid gap-6'>
                <h3 className='text-3xl font-bold'>{data?.title}</h3>
                <div className='flex items-center gap-3 text-sm text-gray-500'>
                  <span>{data?.author}</span>
                  <span>
                    {dayjs(data?.created_at)
                      .tz('Asia/Seoul')
                      .format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>
              <p className='whitespace-pre-line'>{data?.content}</p>
            </div>
          ) : (
            <div className='mt-[200px] flex flex-col items-center gap-6'>
              <span>로그인 후 게시글을 확인할 수 있어요.</span>
              <Button onClick={() => navigate('/login')} className='w-fit'>
                지금 로그인하고 게시글 보기
              </Button>
            </div>
          )}
        </div>
      </section>
      <Modal
        active={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className='w-[calc(100%-32px)] max-w-[300px]'
      >
        <div className='mt-3 grid gap-4 px-4'>
          <p className='text-center'>
            삭제한 게시글은 복구할 수 없습니다.
            <br />
            계속하시겠습니까?
          </p>
          <div className='flex justify-center gap-2'>
            <Button
              onClick={() => setIsModalOpen(false)}
              className='w-fit border border-black bg-transparent text-black'
            >
              취소
            </Button>
            <Button onClick={handleDeletePost} className='w-fit'>
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostDetailPage;
