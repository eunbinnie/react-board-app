import type { UseFormRegister } from 'react-hook-form';

export interface Post {
  title: string;
  content: string;
  author: string;
}

export interface PostInputProps {
  id: string;
  name: keyof Post;
  label: string;
  placeholder: string;
  register: UseFormRegister<Post>;
}
