import {
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openDelete, setOpenDelete] = useState(false); // To control delete dialog
  const [openNote, setOpenNote] = useState(false); // To control note dialog
  const [selectedNote, setSelectedNote] = useState(null); // Store the selected note

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  // Handle opening the delete confirmation dialog
  const handleClickOpenDelete = (note) => {
    setSelectedNote(note); // Set the note to be deleted
    setOpenDelete(true); // Open the delete dialog
  };

  // Handle opening the note details dialog
  const handleClickOpenNote = (note) => {
    setSelectedNote(note); // Set the note to view
    setOpenNote(true); // Open the note dialog
  };

  const handleCloseDelete = () => {
    setOpenDelete(false); // Close the delete dialog without deleting
  };

  const handleCloseNote = () => {
    setOpenNote(false); // Close the note dialog
  };

  const handleDelete = async () => {
    if (selectedNote) {
      await fetch("http://localhost:8000/notes/" + selectedNote.id, {
        method: "DELETE",
      });

      const newNotes = notes.filter((note) => note.id !== selectedNote.id);
      setNotes(newNotes);
    }
    setOpenDelete(false); // Close the dialog after deleting
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      {/* Filter by Category */}
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
            value="shopping"
            control={<Radio />}
            label="Shopping"
          />
          <FormControlLabel
            value="reminders"
            control={<Radio />}
            label="Reminders"
          />
          <FormControlLabel value="work" control={<Radio />} label="Work" />
          <FormControlLabel value="travel" control={<Radio />} label="Travel" />
          <FormControlLabel
            value="leisure"
            control={<Radio />}
            label="Leisure"
          />
          <FormControlLabel
            value="maintenance"
            control={<Radio />}
            label="Maintenance"
          />
          <FormControlLabel value="chores" control={<Radio />} label="Chores" />
          <FormControlLabel
            value="entertainment"
            control={<Radio />}
            label="Entertainment"
          />
          <FormControlLabel value="family" control={<Radio />} label="Family" />
          <FormControlLabel
            value="friends"
            control={<Radio />}
            label="Friends"
          />
          <FormControlLabel value="health" control={<Radio />} label="Health" />
          <FormControlLabel
            value="hobbies"
            control={<Radio />}
            label="Hobbies"
          />
        </RadioGroup>
      </FormControl>

      {/* Notes Display */}
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
              <NoteCard
                notes={note}
                handleDelete={() => handleClickOpenDelete(note)}
                onClick={() => handleClickOpenNote(note)} // Open note dialog when clicked
              />
            </div>
          ))}
      </Masonry>

      {/* Note Details Dialog */}
      <Dialog open={openNote} onClose={handleCloseNote}>
        <DialogTitle>{selectedNote?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedNote?.details}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNote} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <b>{selectedNote?.title}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ bgcolor: "red" }}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
