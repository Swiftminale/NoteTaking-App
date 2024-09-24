import {
  Button,
  Typography,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Paper,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom"; // Updated

export default function Create() {
  const navigate = useNavigate(); // Updated
  const [title, setTitle] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [detailsError, setDetailsError] = React.useState(false);
  const [category, setCategory] = React.useState("money");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => navigate("/")); // Updated
    }
  };

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
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
            display: "block",
          }}
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
            display: "block",
          }}
          onChange={(e) => setDetails(e.target.value)}
          label="Note Details"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          rows={4}
          required
          error={detailsError}
        />
        <FormControl sx={{ marginTop: 5, marginBottom: 20 }}>
          <FormLabel>Notes Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Paper style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="All"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="shopping"
                control={<Radio />}
                label="Shopping"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="work"
                control={<Radio />}
                label="Work"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="travel"
                control={<Radio />}
                label="Travel"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="leisure"
                control={<Radio />}
                label="Leisure"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="maintenance"
                control={<Radio />}
                label="Maintenance"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="chores"
                control={<Radio />}
                label="Chores"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="entertainment"
                control={<Radio />}
                label="Entertainment"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="family"
                control={<Radio />}
                label="Family"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="friends"
                control={<Radio />}
                label="Friends"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="health"
                control={<Radio />}
                label="Health"
                sx={{ width: "33.33%" }}
              />
              <FormControlLabel
                value="hobbies"
                control={<Radio />}
                label="Hobbies"
                sx={{ width: "33.33%" }}
              />
            </Paper>
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
