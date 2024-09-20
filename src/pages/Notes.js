import { Container } from "@mui/material";
import React, { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";


export default function Notes() {
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNotes(data);
      });
  }, []);


  const handleDelete = async (id) =>{
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  }
  const breakpoints ={
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        >
        {notes.map((notes) => (
          <div id={notes.id}>
            <NoteCard notes={notes} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
