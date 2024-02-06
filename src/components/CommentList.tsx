// components/CommentList.tsx
import List from "@mui/material/List";
import CommentListItem from "./CommentListItem";
import type { Comment } from "@/models";

export interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <List>
      {comments.map(comment => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </List>
  );
}
