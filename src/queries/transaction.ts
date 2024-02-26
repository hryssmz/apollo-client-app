// queries/transaction.ts
export const GET_CONTACTS_TRANSACTIONS = `#graphql
  query GetContactsTransactions(
    $userId: ID!
    $dateStart: Date
    $dateEnd: Date
    $amountMin: Int
    $amountMax: Int
    $page: Int
    $limit: Int
  ) {
    getContactsTransactions(
      userId: $userId
      dateStart: $dateStart
      dateEnd: $dateEnd
      amountMin: $amountMin
      amountMax: $amountMax
      page: $page
      limit: $limit
    ) {
      results {
        transaction {
          id
          uuid
          source
          amount
          description
          privacyLevel
          receiverId
          senderId
          balanceAtCompletion
          status
          requestStatus
          requestResolvedAt
          createdAt
          modifiedAt
        }
        sender {
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
        receiver {
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
        comments {
          id
          uuid
          content
          userId
          transactionId
          createdAt
          modifiedAt
        }
        likes {
          id
          uuid
          userId
          transactionId
          createdAt
          modifiedAt
        }
      }
      pageData {
        page
        limit
        count
      }
    }
  }
`;

export const GET_PERSONAL_TRANSACTIONS = `#graphql
  query GetPersonalTransactions(
    $userId: ID!
    $dateStart: Date
    $dateEnd: Date
    $amountMin: Int
    $amountMax: Int
    $page: Int
    $limit: Int
  ) {
    getPersonalTransactions(
      userId: $userId
      dateStart: $dateStart
      dateEnd: $dateEnd
      amountMin: $amountMin
      amountMax: $amountMax
      page: $page
      limit: $limit
    ) {
      results {
        transaction {
          id
          uuid
          source
          amount
          description
          privacyLevel
          receiverId
          senderId
          balanceAtCompletion
          status
          requestStatus
          requestResolvedAt
          createdAt
          modifiedAt
        }
        sender {
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
        receiver {
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
        comments {
          id
          uuid
          content
          userId
          transactionId
          createdAt
          modifiedAt
        }
        likes {
          id
          uuid
          userId
          transactionId
          createdAt
          modifiedAt
        }
      }
      pageData {
        page
        limit
        count
      }
    }
  }
`;

export const GET_PUBLIC_TRANSACTIONS = `#graphql
  query GetPublicTransactions(
    $userId: ID!
    $dateStart: Date
    $dateEnd: Date
    $amountMin: Int
    $amountMax: Int
    $page: Int
    $limit: Int
  ) {
    getPublicTransactions(
      userId: $userId
      dateStart: $dateStart
      dateEnd: $dateEnd
      amountMin: $amountMin
      amountMax: $amountMax
      page: $page
      limit: $limit
    ) {
      results {
        transaction {
          id
          uuid
          source
          amount
          description
          privacyLevel
          receiverId
          senderId
          balanceAtCompletion
          status
          requestStatus
          requestResolvedAt
          createdAt
          modifiedAt
        }
        sender {
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
        receiver {
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
        comments {
          id
          uuid
          content
          userId
          transactionId
          createdAt
          modifiedAt
        }
        likes {
          id
          uuid
          userId
          transactionId
          createdAt
          modifiedAt
        }
      }
      pageData {
        page
        limit
        count
      }
    }
  }
`;

export const GET_TRANSACTION_DETAIL = `#graphql
  query GetTransactionDetail($id: ID!) {
    getTransactionDetail(id: $id) {
      transaction {
        id
        uuid
        source
        amount
        description
        privacyLevel
        receiverId
        senderId
        balanceAtCompletion
        status
        requestStatus
        requestResolvedAt
        createdAt
        modifiedAt
      }
      sender {
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
      receiver {
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
      likes {
        id
        uuid
        userId
        transactionId
        createdAt
        modifiedAt
      }
      comments {
        id
        uuid
        content
        userId
        transactionId
        createdAt
        modifiedAt
      }
    }
  }
`;

export const CREATE_TRANSACTION = `#graphql
  mutation CreateTransaction($payload: CreateTransaction!) {
    createTransaction(payload: $payload) {
      id
      uuid
      source
      amount
      description
      privacyLevel
      receiverId
      senderId
      balanceAtCompletion
      status
      requestStatus
      requestResolvedAt
      createdAt
      modifiedAt
    }
  }
`;

export const UPDATE_TRANSACTION = `#graphql
  mutation UpdateTransaction($payload: UpdateTransaction!) {
    updateTransaction(payload: $payload) {
      id
      uuid
      source
      amount
      description
      privacyLevel
      receiverId
      senderId
      balanceAtCompletion
      status
      requestStatus
      requestResolvedAt
      createdAt
      modifiedAt
    }
  }
`;
