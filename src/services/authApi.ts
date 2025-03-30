import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import supabase from '@/utils/supabase';

import type {
  LoginForm,
  LoginResponse,
  SignupResponse,
} from '@/types/auth.types';
import { type SignUpForm } from '@/types/auth.types';

/**
 * 인증 API
 * @property signUp - 회원가입
 * @property login - 로그인
 */
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignupResponse, SignUpForm>({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          return {
            error: {
              status: error.status || 500,
              message: error.message,
            },
          };
        }

        return { data };
      },
    }),
    login: builder.mutation<LoginResponse, LoginForm>({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return {
            error: {
              status: error.status || 500,
              message: error.message,
            },
          };
        }

        return { data };
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
