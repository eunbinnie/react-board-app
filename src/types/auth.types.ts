import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import type { Session, User } from '@supabase/supabase-js';

// 인증 관련 폼에서 공통으로 사용하는 필드 (로그인, 회원가입 모두 사용)
export type AuthFormFields = {
  email: string;
  password: string;
};

// 회원가입 Form 타입
export type SignUpForm = AuthFormFields;
// 로그인 Form 타입
export type LoginForm = AuthFormFields;

/**
 * 재사용 가능한 form input 컴포넌트용 props 타입 정의
 *
 * @property register - react-hook-form의 register 함수
 * @property errors - 필드별 에러 객체
 * @property name - 해당 input의 name (폼 필드 key 중 하나)
 */
export interface AuthFormInputProps<T extends Record<string, any>> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
}

export type SignupResponse = {
  user: User | null;
  session: Session | null;
};

export type LoginResponse = SignupResponse;
