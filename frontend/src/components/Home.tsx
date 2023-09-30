import React from "react";
import { useNotes } from "../context/NoteContext";
import Note from "./Note";

const Home = () => {
  const { notes } = useNotes();
  return (
    <div className="flex flex-wrap justify-center ">
      {notes?.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </div>
  );
};

export default Home;
