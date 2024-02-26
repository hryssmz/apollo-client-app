// queries/bankAccount.ts
export const LIST_BANK_ACCOUNTS = `#graphql
  query ListBankAccounts {
    listBankAccounts {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;

export const CREATE_BANK_ACCOUNT = `#graphql
  mutation CreateBankAccount($payload: CreateBankAccount!) {
    createBankAccount(payload: $payload) {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;

export const DELETE_BANK_ACCOUNT = `#graphql
  mutation DeleteBankAccount($payload: DeleteBankAccount!) {
    deleteBankAccount(payload: $payload) {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
      modifiedAt
    }
  }
`;
