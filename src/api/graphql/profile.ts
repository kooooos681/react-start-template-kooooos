import { gql } from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
  query GetProfile {
    me {
      id
      email
      name
      avatar
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      email
      name
      avatar
    }
  }
`;

export const UPLOAD_AVATAR_MUTATION = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      id
      avatar
    }
  }
`; 