// components/transaction/list/TransactionInfiniteList.tsx
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InfiniteLoader, List } from "react-virtualized";
import "react-virtualized/styles.css";
import TransactionItem from "../detail/TransactionItem";
import type { PageData, TransactionDetail } from "@/graphql/graphql";

export interface TransactionInfiniteListProps {
  transactions: TransactionDetail[];
  loadNextPage: (page: number) => void;
  pageData: PageData;
}

export default function TransactionInfiniteList({
  transactions,
  loadNextPage,
  pageData: { count, limit, page },
}: TransactionInfiniteListProps) {
  const theme = useTheme();
  const isXsBreakpoint = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hasNextPages = limit * page < count;
  const rowCount = hasNextPages ? transactions.length + 1 : transactions.length;

  return (
    <InfiniteLoader
      isRowLoaded={params =>
        !hasNextPages || params.index < transactions.length
      }
      loadMoreRows={async () => hasNextPages && loadNextPage(page + 1)}
      rowCount={rowCount}
      threshold={2}
    >
      {({ onRowsRendered, registerChild }) => (
        <Box
          sx={{
            width: "100%",
            minHeight: "80vh",
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <List
            rowCount={rowCount}
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            height={parseInt(
              isXsBreakpoint ? theme.spacing(74) : theme.spacing(88)
            )}
            width={parseInt(
              isXsBreakpoint ? theme.spacing(38) : theme.spacing(110)
            )}
            rowHeight={parseInt(
              isXsBreakpoint ? theme.spacing(28) : theme.spacing(16)
            )}
            rowRenderer={({ key, index, style }) => {
              return (
                index < transactions.length && (
                  <div key={key} style={style}>
                    <TransactionItem
                      id={transactions[index].transaction.id}
                      description={transactions[index].transaction.description}
                      requestStatus={
                        transactions[index].transaction.requestStatus
                      }
                      amount={transactions[index].transaction.amount}
                      commentsCount={transactions[index].comments.length}
                      likesCount={transactions[index].likes.length}
                      senderName={`${transactions[index].sender.firstName} ${transactions[index].sender.lastName}`}
                      senderAvatar={
                        transactions[index].sender.avatar ?? undefined
                      }
                      receiverName={`${transactions[index].receiver.firstName} ${transactions[index].receiver.lastName}`}
                      receiverAvatar={
                        transactions[index].receiver.avatar ?? undefined
                      }
                    />
                    <Divider variant={isMobile ? "fullWidth" : "inset"} />
                  </div>
                )
              );
            }}
          />
        </Box>
      )}
    </InfiniteLoader>
  );
}
