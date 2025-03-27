import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

const HomePage = () => {
  return (
    <main className='mx-auto my-10 px-8'>
      <Input type='password' error={true} errorMessage='에러 메세지' />
      <Button disabled={false} isLoading>
        버튼
      </Button>
    </main>
  );
};

export default HomePage;
