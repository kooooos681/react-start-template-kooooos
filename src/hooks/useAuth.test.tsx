import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useAuth } from './useAuth';
import { LOGIN_MUTATION, REGISTER_MUTATION, GET_CURRENT_USER_QUERY } from '../api/graphql/auth';
import type { User } from '../types/user';

const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'USER',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        email: 'test@example.com',
        password: 'password123',
      },
    },
    result: {
      data: {
        login: {
          token: 'test-token',
          user: mockUser,
        },
      },
    },
  },
  {
    request: {
      query: REGISTER_MUTATION,
      variables: {
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      },
    },
    result: {
      data: {
        register: {
          token: 'new-token',
          user: {
            ...mockUser,
            id: '2',
            email: 'new@example.com',
            name: 'New User',
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: mockUser,
      },
    },
  },
];

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('handles successful login', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.user).toBe(null);

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('handles successful registration', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register('new@example.com', 'password123', 'New User');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.user).toEqual({
      ...mockUser,
      id: '2',
      email: 'new@example.com',
      name: 'New User',
    });
    expect(localStorage.getItem('token')).toBe('new-token');
  });

  it('handles login error', async () => {
    const errorMock = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            email: 'test@example.com',
            password: 'wrong-password',
          },
        },
        error: new Error('Invalid credentials'),
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'wrong-password');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });

  it('handles logout', async () => {
    localStorage.setItem('token', 'test-token');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem('token')).toBe('test-token');

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });

  it('restores session from token', async () => {
    localStorage.setItem('token', 'test-token');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.user).toEqual(mockUser);
  });

  it('handles registration error - email already exists', async () => {
    const errorMock = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            email: 'existing@example.com',
            password: 'password123',
            name: 'Existing User',
          },
        },
        error: new Error('Email already exists'),
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register('existing@example.com', 'password123', 'Existing User');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Email already exists');
    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });

  it('handles registration error - invalid password', async () => {
    const errorMock = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            email: 'new@example.com',
            password: 'short',
            name: 'New User',
          },
        },
        error: new Error('Password must be at least 8 characters long'),
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register('new@example.com', 'short', 'New User');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Password must be at least 8 characters long');
    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });

  it('handles invalid token during session restoration', async () => {
    localStorage.setItem('token', 'invalid-token');

    const errorMock = [
      {
        request: {
          query: GET_CURRENT_USER_QUERY,
        },
        error: new Error('Invalid token'),
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Invalid token');
    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });

  it('handles concurrent login and logout operations', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Start login
    const loginPromise = act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    // Immediately logout
    act(() => {
      result.current.logout();
    });

    // Wait for login to complete
    await loginPromise;

    // Login should be cancelled and user should be logged out
    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });

  it('handles network error during login', async () => {
    const errorMock = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            email: 'test@example.com',
            password: 'password123',
          },
        },
        error: new Error('Network error'),
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network error');
    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });
}); 