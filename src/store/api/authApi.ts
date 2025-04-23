import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface RegistrationRequest {
  email: string;
  password: string;
}

interface RegistrationResponse {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface ErrorResponse {
  errors: Array<{
    message: string;
    extensions?: {
      code: string;
    };
  }>;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api',
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: (baseQueryReturnValue: FetchBaseQueryError) => {
        const errorData = baseQueryReturnValue.data as ErrorResponse;
        return errorData.errors?.[0]?.message || 'Registration failed';
      },
    }),
  }),
});

export const { useRegisterMutation } = authApi; 