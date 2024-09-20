import { DeleteOutline } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import React from "react";
import { yellow, green, pink, blue } from "@mui/material/colors";

export default function NoteCard({ notes, handleDelete }) {
  const category = notes.category.toLowerCase(); // Normalize category

  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "16px" }}>
        {" "}
        {/* Adjusted borderRadius here */}
        <CardHeader
          avatar={
            <Avatar
              sx={{
                backgroundColor: () => {
                  if (category === "work") {
                    return yellow[700];
                  }
                  if (category === "money") {
                    return green[500];
                  }
                  if (category === "todos") {
                    return pink[500];
                  }
                  return blue[500]; // Sets Blue as a default color for other components
                },
              }}
            >
              {category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(notes.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={notes.title}
          subheader={notes.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {notes.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
