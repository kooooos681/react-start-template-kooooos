import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RegisterRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  email: string;
}

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api' }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi; 