import type { UseFormRegister } from 'react-hook-form';

// 게시글 목록 조회 파라미터
export interface GetPostsParams {
  keyword?: string;
  sort?: string;
}

// 게시글 입력 타입
export interface Post {
  title: string;
  content: string;
  author: string;
}

// 게시글 response 타입
export interface PostInputProps {
  id: string;
  name: keyof Post;
  label: string;
  placeholder: string;
  register: UseFormRegister<Post>;
}

// 게시글 목록 조회 response 타입
export interface PostItem {
  author: string;
  content: string;
  created_at: string;
  id: string;
  title: string;
  user_id: string;
}

// 게시글 상세 조회 파라미터
export interface GetPostDetail {
  id?: string;
}

// 게시글 목록 저장 타입
export interface PostStoreItem {
  data: PostItem[];
}
