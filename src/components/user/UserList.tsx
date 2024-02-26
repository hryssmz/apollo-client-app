// components/user/UserList.tsx
import List from "@mui/material/List";
import UserListItem from "./UserListItem";
import type { User } from "@/graphql/graphql";

export interface UserListProps {
  users: User[];
  setReceiver: (user: User) => void;
}

export default function UserList({ users, setReceiver }: UserListProps) {
  return (
    <List>
      {users.map(user => (
        <UserListItem key={user.id} user={user} setReceiver={setReceiver} />
      ))}
    </List>
  );
}
