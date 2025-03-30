import { useRef, useState } from 'react';

import { useGetPostsByKeywordQuery } from '@/services/postApi';

import Input from '../input/Input';

const SearchSortBox = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>('');
  const { data } = useGetPostsByKeywordQuery(keyword);

  const handleSearchKeyword: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setKeyword(inputRef.current?.value || '');
  };

  console.log(data);

  return (
    <div className='mt-3'>
      {/* 게시글 검색 input */}
      <form onSubmit={handleSearchKeyword}>
        <Input ref={inputRef} isSearch />
      </form>
      {/* 게시글 정렬 버튼 */}
      <div></div>
    </div>
  );
};

export default SearchSortBox;
