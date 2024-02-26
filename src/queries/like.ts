// queries/like.ts
export const CREATE_LIKE = `#graphql
  mutation CreateLike($payload: CreateLike!) {
    createLike(payload: $payload) {
      id
      uuid
      userId
      transactionId
      createdAt
      modifiedAt
    }
  }
`;
