import { useLoaderData, useRevalidator } from "react-router";
import { Container } from "../../../types";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function ReinstallPage() {
  const container = useLoaderData() as Container & { statusCode: number };

  if (container.statusCode === 404) {
    return "Container not found";
  }

  const revalidator = useRevalidator();
  const [isReinstalling, setReinstalling] = useState<boolean>();

  return (
    <Paper square sx={{ padding: 1 }}>
      <Paper variant="outlined">
        <Typography variant="h6">Reinstall: {container.name}</Typography>
        <Typography variant="h6" color="textSecondary">
          Current image: {container.image.split("/")[1]} {">"} Some new image
        </Typography>
        <ButtonGroup>
          <Button
            loading={isReinstalling}
            onClick={async () => await switchImage("debian")}
          >
            Reinstall
          </Button>
        </ButtonGroup>
      </Paper>
    </Paper>
  );

  async function switchImage(image: string) {
    setReinstalling(true);

    const res = await fetch(
      `/api/containers/${container.name}/reinstall?force=true`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      },
    );

    if (res.ok) {
      setReinstalling(false);
      revalidator.revalidate();
    }
  }
}
