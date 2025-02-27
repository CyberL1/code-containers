import { useLoaderData } from "react-router";
import { Container } from "../../../types";
import { Paper, Typography } from "@mui/material";
import WebTerminal from "../../../components/WebTerminal";

export default function TerminalPage() {
  const container = useLoaderData() as Container & { statusCode: number };

  if (container.statusCode === 404) {
    return "Container not found";
  }

  return (
    <Paper square sx={{ padding: 1 }}>
      <Paper sx={{ display: "flex" }} variant="outlined">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Terminal: {container.name}
        </Typography>
      </Paper>
      <WebTerminal />
    </Paper>
  );
}
