import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import animationData from '@/assets/lottie/new-post.json';
import type { RootState } from '@/store/store';
import Lottie from 'lottie-react';

const HomePage = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div className='flex flex-col items-center md:pt-20'>
      <div className='flex aspect-square w-[200px]'>
        <Lottie animationData={animationData} loop={false} />
      </div>
      <Link
        to={'/posts/new'}
        className='rounded-xl px-4 py-2 font-medium hover:bg-gray-100'
      >
        {isAuthenticated ? '게시글 작성하기' : '로그인하고 게시글 작성하기'}
      </Link>
    </div>
  );
};

export default HomePage;
