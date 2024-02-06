// components/CommentListItem.tsx
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import type { Comment } from "@/models";

export interface CommentListItemProps {
  comment: Comment;
}

export default function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <ListItem>
      <ListItemText primary={comment.content} />
    </ListItem>
  );
}
