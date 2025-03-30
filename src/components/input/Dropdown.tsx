import { useState } from 'react';

import CaretIcon from '@/assets/icons/ic-caret';

export interface ISortValue {
  text: string;
  id: string;
}

interface IDropdownProps {
  sortValue: ISortValue[];
  onClick: (id: string) => void;
}

function Dropdown({ sortValue, onClick }: IDropdownProps) {
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState(sortValue[0].text);

  const toggleDropdown = () => {
    setView(!view);
  };

  const onClickSort = (id: string) => () => {
    const selectedValue = sortValue.find((value) => value.id === id);
    if (selectedValue) {
      setSelected(selectedValue.text);
    }

    toggleDropdown();
    onClick(id);
  };

  return (
    <div className='relative w-[100px]'>
      <button
        type='button'
        onClick={toggleDropdown}
        className='flex h-[36px] w-full cursor-pointer items-center justify-between rounded-md border border-gray-500 px-3'
      >
        <p className='text-primary-gray-500 text-sm leading-[1.7]'>
          {selected}
        </p>
        <CaretIcon />
      </button>
      {view && (
        <>
          <div
            className='fixed bottom-0 left-0 right-0 top-0'
            onClick={toggleDropdown}
          />
          <ul className='absolute mt-2 grid w-full gap-[5px] rounded-[10px] border border-gray-200 bg-white px-1 py-[6px] shadow-lg'>
            {sortValue.map((sort) => (
              <li
                key={sort.id}
                onClick={onClickSort(sort.id)}
                className='cursor-pointer px-4 py-[6px] text-sm leading-[1.7] hover:bg-gray-100'
              >
                {sort.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Dropdown;
