// components/user/UserListSearchForm.tsx
import { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import type { QuerySearchUsersArgs } from "@/graphql/graphql";

export interface UserListSearchFormProps {
  userListSearch: (query: QuerySearchUsersArgs) => void;
}

export default function UserListSearchForm({
  userListSearch,
}: UserListSearchFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Box component="form" sx={{ width: "100%", mt: 1 }}>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name="q"
        type="text"
        id="user-list-search-input"
        inputRef={inputRef}
        onFocus={() => {
          if (inputRef.current !== null) {
            inputRef.current.value = "";
            inputRef.current.focus();
          }
        }}
        onChange={({ target: { value: q } }) => {
          userListSearch({ q });
        }}
      />
    </Box>
  );
}
