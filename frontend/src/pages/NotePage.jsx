import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNote = async () => {
    if (params.id === "new") {
      return;
    }
    const response = await fetch(`/api/notes/${params.id}`);
    const note = await response.json();
    setNote(note);
  };

  // Update functionality ->
  const updateNote = async () => {
    const content = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    fetch(`/api/notes/${params.id}/update`, content);
  };

  // Delete functionality ->

  const deleteNote = async () => {
    const content = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/notes/${params.id}/delete`, content);
    navigate('/');
  };

  // create functionality ->
  const createNote = async () => {
    const content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    fetch(`/api/notes/create`, content);
  };

  const handleSubmit = () => {
    if (params.id !== 'new' && note.body === '') {
      deleteNote()
  } else if (params.id !== 'new') {
      updateNote()
  } else if (params.id === 'new' && note.body !== null) {
      createNote()
  }
    navigate('/');
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {params.id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(event) => handleChange(event.target.value )}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
