// queries/user.ts
export const GET_USER = `#graphql
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      uuid
      firstName
      lastName
      username
      email
      phoneNumber
      balance
      avatar
      defaultPrivacyLevel
      createdAt
      modifiedAt
    }
  }
`;

export const SERACH_USERS = `#graphql
  query SearchUsers($q: String) {
    searchUsers(q: $q) {
      id
      uuid
      firstName
      lastName
      username
      email
      phoneNumber
      balance
      avatar
      defaultPrivacyLevel
      createdAt
      modifiedAt
    }
  }
`;

export const CREATE_USER = `#graphql
  mutation CreateUser($payload: CreateUser!) {
    createUser(payload: $payload) {
      id
      uuid
      firstName
      lastName
      username
      email
      phoneNumber
      balance
      avatar
      defaultPrivacyLevel
      createdAt
      modifiedAt
    }
  }
`;

export const UPDATE_USER = `#graphql
  mutation UpdateUser($payload: UpdateUser!) {
    updateUser(payload: $payload) {
      id
      uuid
      firstName
      lastName
      username
      email
      phoneNumber
      balance
      avatar
      defaultPrivacyLevel
      createdAt
      modifiedAt
    }
  }
`;
