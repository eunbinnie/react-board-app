import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetPostsByKeywordQuery } from '@/services/postApi';
import { setPosts } from '@/store/postSlice';

import Input from '../input/Input';

const SearchSortBox = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>('');
  const { data } = useGetPostsByKeywordQuery(keyword);

  const handleSearchKeyword: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setKeyword(inputRef.current?.value || '');
  };

  useEffect(() => {
    dispatch(setPosts(data || []));
  }, [data]);

  return (
    <div className='mt-3'>
      {/* 게시글 검색 input */}
      <form onSubmit={handleSearchKeyword}>
        <Input
          ref={inputRef}
          isSearch
          placeholder='게시글 제목을 검색해보세요'
        />
      </form>
      {/* 게시글 정렬 버튼 */}
      <div></div>
    </div>
  );
};

export default SearchSortBox;
