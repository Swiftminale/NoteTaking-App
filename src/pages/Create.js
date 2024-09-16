import { Button, Typography, Container } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";


export default function Create() {
  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create New Note
      </Typography>
      <Button
        onClick={() => console.log("clicked")}
        type="submit"
        color="secondary"
        variant="contained"
        endIcon={<AddIcon />}
      >
        Submit
      </Button>
    </Container>
  );
}
