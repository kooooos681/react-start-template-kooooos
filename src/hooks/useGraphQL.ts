import { useQuery, useMutation, QueryHookOptions, MutationHookOptions } from '@apollo/client';
import { DocumentNode } from 'graphql';

export function useGraphQLQuery<TData = any, TVariables = any>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
) {
  return useQuery<TData, TVariables>(query, {
    ...options,
    fetchPolicy: 'network-only',
  });
}

export function useGraphQLMutation<TData = any, TVariables = any>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
) {
  return useMutation<TData, TVariables>(mutation, {
    ...options,
    fetchPolicy: 'network-only',
  });
} 