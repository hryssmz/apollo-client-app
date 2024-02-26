// components/transaction/list/SkeletonList.tsx
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonList() {
  return (
    <Box sx={{ minHeight: "100vh", mx: 2, width: "95%" }}>
      {[...new Array(9)].map((_, i) => (
        <Fragment key={`skeleton-${i}`}>
          <br />
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <br />
        </Fragment>
      ))}
    </Box>
  );
}
