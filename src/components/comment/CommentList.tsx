// components/comment/CommentList.tsx
import List from "@mui/material/List";
import CommentListItem from "./CommentListItem";
import type { Comment } from "@/graphql/graphql";

export interface CommentListProps {
  comments: Pick<Comment, "id" | "content">[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <List>
      {comments.map(({ id, content }) => (
        <CommentListItem key={id} content={content} />
      ))}
    </List>
  );
}
