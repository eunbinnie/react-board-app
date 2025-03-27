import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import supabase from '@/utils/supabase';

import type { SignUpForm } from '@/types/auth.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUp: builder.mutation<any, SignUpForm>({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error };

        return { data };
      },
    }),
  }),
});

export const { useSignUpMutation } = authApi;
