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

export interface PostItem {
  author: string;
  content: string;
  created_at: string;
  id: string;
  title: string;
  user_id: string;
}

export interface GetPostDetail {
  id?: string;
}

export interface PostStoreItem {
  data: PostItem[];
}
