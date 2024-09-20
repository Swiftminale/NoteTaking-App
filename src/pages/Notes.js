import {
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check the fetched notes data
        setNotes(data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <FormControl>
        <FormLabel>Filter by Category</FormLabel>
        <RadioGroup
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          row
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="money" control={<Radio />} label="Money" />
          <FormControlLabel value="todos" control={<Radio />} label="Todos" />
          <FormControlLabel
            value="reminders"
            control={<Radio />}
            label="Reminders"
          />
          <FormControlLabel value="work" control={<Radio />} label="Work" />
        </RadioGroup>
      </FormControl>

      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes
          .filter(
            (note) =>
              selectedCategory === "all" ||
              note.category.toLowerCase() === selectedCategory
          )
          .map((note) => (
            <div key={note.id}>
              <NoteCard notes={note} handleDelete={handleDelete} />
            </div>
          ))}
      </Masonry>
    </Container>
  );
}
