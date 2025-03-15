import { useLoaderData, useRevalidator } from "react-router";
import { Container } from "../../../types";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ReinstallPage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getImages = async () => {
      const apiCall = await fetch("/api/images");
      const images = await apiCall.json();

      const imagesForSelect = [];
      for (const image of images) {
        imagesForSelect.push(image.split("/")[1].split(":")[0]);
      }

      setImages(imagesForSelect);
    };

    getImages();
  }, []);

  const container = useLoaderData() as Container & { statusCode: number };

  if (container.statusCode === 404) {
    return "Container not found";
  }

  const revalidator = useRevalidator();
  const [image, setImage] = useState<string>(container.image.split("/")[1]);
  const [isReinstalling, setReinstalling] = useState<boolean>();

  return (
    <Paper square sx={{ padding: 1 }}>
      <Paper variant="outlined">
        <Typography variant="h6">Reinstall: {container.name}</Typography>
        <FormControl>
          <InputLabel id="image-select">Image</InputLabel>
          <Select
            labelId="image-select"
            defaultValue={image}
            onChange={(e) => setImage(e.target.value)}
          >
            {images.map((image) => (
              <MenuItem value={image}>{image}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonGroup>
          <Button
            loading={isReinstalling}
            onClick={async () => await switchImage(image)}
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
