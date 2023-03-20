import React, { useEffect, useState } from "react";
import ListIteam from "../components/ListIteam";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch("/api/notes/");
    const notes = await response.json();
    setNotes(notes);
  };

  return (
    <div className="notes">

      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => {
          return <ListIteam key={index} note={note} />;
        })}
      </div>

      <AddButton />
    </div>
  );
};

export default NotesListPage;
