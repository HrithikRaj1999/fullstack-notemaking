import React from "react";
import { useNotes } from "../context/NoteContext";
import Note from "./Note";
import Error from "./Error";

const Home = () => {
  const { notes } = useNotes();
  return (
    <div className="flex flex-wrap justify-center  ">
      {notes.length === 0 ? (
        <Error />
      ) : (
        notes?.map((note) => <Note key={note._id} note={note} />)
      )}
    </div>
  );
};

export default Home;
