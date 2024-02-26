// components/comment/CommentListItem.tsx
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export interface CommentListItemProps {
  content: string;
}

export default function CommentListItem({ content }: CommentListItemProps) {
  return (
    <ListItem>
      <ListItemText primary={content} />
    </ListItem>
  );
}
