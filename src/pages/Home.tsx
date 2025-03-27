import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

const HomePage = () => {
  return (
    <>
      <Input type='password' error={true} errorMessage='에러 메세지' />
      <Button disabled={false}>버튼</Button>
    </>
  );
};

export default HomePage;
