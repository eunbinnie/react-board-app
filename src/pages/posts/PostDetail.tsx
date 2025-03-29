import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetPostDetailQuery } from '@/services/postApi';
import type { RootState } from '@/store/store';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import Button from '@/components/button/Button';

import ArrowLeft from '/icons/arrow-left.svg';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const { data, error } = useGetPostDetailQuery({ id });

  if (error) {
    console.error(error);
  }

  return (
    <section className='mt-5 inline-block w-full'>
      <div className='mx-auto max-w-screen-lg'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center text-sm leading-none text-gray-400'
        >
          <img src={ArrowLeft} alt='뒤로가기 아이콘' />
          <span>뒤로가기</span>
        </button>
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
  );
};

export default PostDetailPage;
