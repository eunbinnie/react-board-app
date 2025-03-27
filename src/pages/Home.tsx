import { useId } from 'react';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import InputWrapper from '@/components/input/InputWrapper';

const HomePage = () => {
  const passwordId = useId();

  return (
    <main className='mx-auto my-10 px-8'>
      <InputWrapper label='비밀번호' htmlFor={passwordId}>
        <Input id={passwordId} type='password' />
      </InputWrapper>
      <Button disabled={false} isLoading>
        버튼
      </Button>
    </main>
  );
};

export default HomePage;
