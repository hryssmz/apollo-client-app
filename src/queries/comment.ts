// queries/comment.ts
export const CREATE_COMMENT = `#graphql
  mutation CreateComment($payload: CreateComment!) {
    createComment(payload: $payload) {
      id
      uuid
      content
      userId
      transactionId
      createdAt
      modifiedAt
    }
  }
`;
