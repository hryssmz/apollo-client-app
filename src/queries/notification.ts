// queries/notification.ts
export const GET_UNREAD_NOTIFICATIONS = `#graphql
  query GetUnreadNotifications($userId: ID!) {
    getUnreadNotifications(userId: $userId) {
      id
      uuid
      userId
      transactionId
      message
      isRead
      createdAt
      modifiedAt
    }
  }
`;

export const UPDATE_NOTIFICATION = `#graphql
  mutation UpdateNotification($payload: UpdateNotification!) {
    updateNotification(payload: $payload) {
      id
    }
  }
`;
