// components/transaction/detail/TransactionDetail.tsx
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentForm from "@/components/comment/CommentForm";
import CommentsList from "@/components/comment/CommentList";
import TransactionAmount from "./TransactionAmount";
import TransactionTitle from "./TransactionTitle";
import type {
  Comment,
  Like,
  MutationCreateCommentArgs,
  MutationCreateLikeArgs,
  Transaction,
  User,
} from "@/graphql/graphql";

export interface TransactionDetailProps {
  transaction: Transaction;
  sender: User;
  receiver: User;
  likes: Like[];
  comments: Comment[];
  transactionLike: (payload: MutationCreateLikeArgs["payload"]) => void;
  transactionComment: (payload: MutationCreateCommentArgs["payload"]) => void;
  transactionUpdate: (
    payload: Pick<Transaction, "requestStatus" | "id">
  ) => void;
  currentUser: User;
}

export default function TransactionDetail({
  transaction,
  sender,
  receiver,
  likes,
  comments,
  transactionLike,
  transactionComment,
  transactionUpdate,
  currentUser,
}: TransactionDetailProps) {
  const theme = useTheme();
  return (
    <Paper
      sx={{ p: 2, display: "flex", overflow: "auto", flexDirection: "column" }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Transaction Detail
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item sx={{ mt: 4 }}>
          <AvatarGroup max={2} sx={{ m: "10px" }}>
            <Avatar
              src={sender.avatar ?? undefined}
              sx={{ width: theme.spacing(7), height: theme.spacing(7) }}
            />
            <Avatar
              src={receiver.avatar ?? undefined}
              sx={{ width: theme.spacing(7), height: theme.spacing(7) }}
            />
          </AvatarGroup>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item></Grid>
            <Grid item>
              <TransactionTitle
                requestStatus={transaction.requestStatus}
                senderName={`${sender.firstName} ${sender.lastName}`}
                receiverName={`${receiver.firstName} ${receiver.lastName}`}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {transaction.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TransactionAmount
            requestStatus={transaction.requestStatus}
            amount={transaction.amount}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item>{`${likes.length} `}</Grid>
            <Grid item>
              <IconButton
                color="primary"
                disabled={
                  likes.findIndex(({ userId }) => userId === currentUser.id) >=
                  0
                }
                onClick={() =>
                  transactionLike({
                    transactionId: transaction.id,
                    userId: currentUser.id,
                  })
                }
              >
                <ThumbUpAltOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item>
              {currentUser.id === receiver.id &&
                transaction.requestStatus === "pending" && (
                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        transactionUpdate({
                          id: transaction.id,
                          requestStatus: "accepted",
                        });
                      }}
                      sx={{
                        mr: 2,
                        color: "#ffffff",
                        bgcolor: "#00C853",
                        py: "5px",
                        pr: "20px",
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "#4CAF50",
                          borderColor: "#00C853",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Accept Request
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        transactionUpdate({
                          id: transaction.id,
                          requestStatus: "rejected",
                        });
                      }}
                      sx={{
                        mr: 2,
                        color: "#ffffff",
                        bgcolor: "red",
                        py: "5px",
                        pr: "20px",
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "red",
                          borderColor: "red",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Reject Request
                    </Button>
                  </Grid>
                )}
            </Grid>
          </Grid>
          <Grid item>
            <CommentForm
              transactionId={transaction.id}
              transactionComment={payload => transactionComment(payload)}
            />
          </Grid>
        </Grid>
      </Grid>
      {comments.length > 0 && (
        <Paper
          sx={{
            mt: 6,
            p: 2,
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            <CommentRoundedIcon />
            Comments
          </Typography>
          <CommentsList comments={comments} />
        </Paper>
      )}
    </Paper>
  );
}
