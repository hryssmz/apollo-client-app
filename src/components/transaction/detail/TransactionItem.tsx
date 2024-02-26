// components/transaction/detail/TransactionItem.tsx
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Avatar, { avatarClasses } from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import TransactionAmount from "./TransactionAmount";
import TransactionTitle from "./TransactionTitle";

export interface TransactionItemProps {
  id: string;
  description: string;
  requestStatus: string;
  amount: number;
  senderName: string;
  senderAvatar?: string;
  receiverName: string;
  receiverAvatar?: string;
  likesCount: number;
  commentsCount: number;
}

export default function TransactionItem({
  id,
  description,
  requestStatus,
  amount,
  senderName,
  senderAvatar,
  receiverName,
  receiverAvatar,
  likesCount,
  commentsCount,
}: TransactionItemProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <ListItem
      alignItems="flex-start"
      onClick={() => navigate(`/transaction/${id}`)}
    >
      <Paper elevation={0} sx={{ p: 0, m: "auto", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item>
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    src={receiverAvatar}
                    sx={{
                      [`&.${avatarClasses.root}`]: {
                        width: 22,
                        height: 22,
                        border: `2px solid ${theme.palette.background.paper}`,
                      },
                    }}
                  />
                }
              >
                <Avatar src={senderAvatar} />
              </Badge>
            </ListItemAvatar>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <TransactionTitle
                  requestStatus={requestStatus}
                  senderName={senderName}
                  receiverName={receiverName}
                />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {description}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                  sx={{ [theme.breakpoints.down("sm")]: { mt: 2 } }}
                >
                  <Grid item>
                    <ThumbUpAltOutlinedIcon
                      sx={{ color: theme.palette.grey[400] }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        color: theme.palette.grey[400],
                        mt: "2px",
                        height: theme.spacing(2),
                        width: theme.spacing(2),
                      }}
                    >
                      {likesCount}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CommentRoundedIcon
                      sx={{ color: theme.palette.grey[400] }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        color: theme.palette.grey[400],
                        mt: "2px",
                        height: theme.spacing(2),
                        width: theme.spacing(2),
                      }}
                    >
                      {commentsCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TransactionAmount
                requestStatus={requestStatus}
                amount={amount}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  );
}
