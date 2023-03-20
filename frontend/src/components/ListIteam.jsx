import React from "react";
import { Link } from "react-router-dom";

const ListIteam = ({ note }) => {

  let getTitle = (note) => {

    let title = note.body.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}

  const getTime = (note) => {
    return new Date(note.updated).toLocaleString();
  }

  return (
    <div>
      <Link to={`/note/${note.id}`}>
        <div className="notes-list-item">
          <h3>{getTitle(note)}</h3>
          <p><span>{getTime(note)}</span></p>
        </div>
      </Link>
    </div>
  );
};

export default ListIteam;
