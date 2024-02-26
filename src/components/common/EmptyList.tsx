// components/common/EmptyList.tsx
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export interface EmptyListProps {
  entity: string;
  children?: React.ReactNode;
}

export default function EmptyList({ entity, children }: EmptyListProps) {
  return (
    <Box
      display="flex"
      height={600}
      minHeight={600}
      alignItems="center"
      justifyContent="center"
      border={1}
      borderColor={grey[200]}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%", width: "100%" }}
        spacing={2}
      >
        <Grid item>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            No {entity}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            width={300}
            alignItems="center"
            justifyContent="center"
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
