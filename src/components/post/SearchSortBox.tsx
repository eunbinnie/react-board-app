import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetPostsQuery } from '@/services/postApi';
import { setPosts } from '@/store/postSlice';

import Dropdown from '../input/Dropdown';
import Input from '../input/Input';

const SORT_VALUES = [
  { id: 'created_at.desc', text: '최신순' },
  { id: 'created_at.asc', text: '오래된순' },
];

const SearchSortBox = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [sortId, setSortId] = useState<string>('created_at.desc');
  const { data } = useGetPostsQuery({ keyword, sort: sortId });

  const handleSearchKeyword: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setKeyword(inputRef.current?.value || '');
  };

  const handleSort = (id: string) => {
    setSortId(id);
  };

  useEffect(() => {
    dispatch(setPosts(data || []));
  }, [data]);

  return (
    <div className='mt-3 flex items-center justify-end gap-2'>
      {/* 게시글 검색 input */}
      <form onSubmit={handleSearchKeyword}>
        <Input
          ref={inputRef}
          isSearch
          placeholder='게시글 제목을 검색해보세요'
        />
      </form>
      {/* 게시글 정렬 드롭다운 */}
      <div>
        <Dropdown sortValue={SORT_VALUES} onClick={handleSort} />
      </div>
    </div>
  );
};

export default SearchSortBox;
