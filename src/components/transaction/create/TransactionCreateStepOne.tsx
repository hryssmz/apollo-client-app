// components/transaction/create/TransactionCreateStepOne.tsx
import Paper from "@mui/material/Paper";
import UserList from "@/components/user/UserList";
import UserListSearchForm from "@/components/user/UserListSearchForm";
import type { QuerySearchUsersArgs, User } from "@/graphql/graphql";

export interface TransactionCreateStepOneProps {
  setReceiver: (user: User) => void;
  userListSearch: (query: QuerySearchUsersArgs) => void;
  users: User[];
}

export default function TransactionCreateStepOne({
  setReceiver,
  userListSearch,
  users,
}: TransactionCreateStepOneProps) {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, display: "flex", overflow: "auto", flexDirection: "column" }}
    >
      <UserListSearchForm userListSearch={userListSearch} />
      <UserList users={users} setReceiver={setReceiver} />
    </Paper>
  );
}
