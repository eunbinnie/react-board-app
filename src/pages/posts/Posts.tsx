import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import useKRTime from '@/hooks/useKRTime';
import { useGetPostsQuery } from '@/services/postApi';
import { setPosts } from '@/store/postSlice';
import type { RootState } from '@/store/store';

import Button from '@/components/button/Button';
import SearchSortBox from '@/components/post/SearchSortBox';

const PostListPage = () => {
  const { format } = useKRTime();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postListData = useSelector((state: RootState) => state.post.data); // 게시글 목록 데이터
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  ); // 인증 상태 조회
  const { data } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  }); // 게시글 목록 조회 API

  useEffect(() => {
    dispatch(setPosts(data || []));
  }, [dispatch, data]);

  return (
    <section className='mt-5 inline-block w-full'>
      <div className='mx-auto max-w-screen-lg'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-bold'>게시글 목록</h3>
          {isAuthenticated && (
            <Button onClick={() => navigate('/posts/new')} className='w-fit'>
              게시글 작성
            </Button>
          )}
        </div>
        {isAuthenticated && <SearchSortBox />}
        {isAuthenticated ? (
          <div className='mt-10 grid border-t border-gray-300'>
            <div className='flex items-center border-b py-2'>
              <div className='w-[calc(100%-220px)] flex-1 text-center'>
                제목
              </div>
              <div className='w-[100px] truncate text-center'>작성자</div>
              <div className='w-[120px] text-center'>작성일</div>
            </div>
            {postListData.length !== 0 ? (
              postListData?.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center overflow-hidden border-b py-2'
                >
                  <div className='w-[calc(100%-220px)] flex-1 truncate'>
                    <Link to={`/posts/${item.id}`}>{item.title}</Link>
                  </div>
                  <div className='w-[100px] truncate text-center'>
                    {item.author}
                  </div>
                  <div className='w-[120px] text-center'>
                    {format(item.created_at)}
                  </div>
                </div>
              ))
            ) : (
              <div className='mt-[60px] text-center text-gray-500'>
                게시글이 없습니다.
              </div>
            )}
          </div>
        ) : (
          <div className='mt-[200px] flex flex-col items-center gap-6'>
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
