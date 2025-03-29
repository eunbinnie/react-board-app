import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetPostsQuery } from '@/services/postApi';
import type { RootState } from '@/store/store';

import Button from '@/components/button/Button';

const PostListPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const { data, error } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (data) {
    console.log(data);
  }

  if (error) {
    console.error(error);
  }

  return (
    <section className='mt-5 inline-block w-full'>
      <div className='mx-auto max-w-screen-lg'>
        <div>
          <h3 className='text-2xl font-bold'>게시글 목록</h3>
        </div>
        {isAuthenticated ? (
          <div className='mt-10 grid gap-5'>post list</div>
        ) : (
          <div className='mt-[500px] flex flex-col items-center gap-6'>
            <span>로그인 후 게시글 목록을 확인할 수 있어요.</span>
            <Button onClick={() => navigate('/login')} className='w-fit'>
              지금 로그인하고 게시글 보기
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostListPage;
