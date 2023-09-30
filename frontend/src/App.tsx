import { useEffect, useState } from "react";
import { NoteModel } from "./model/noteModel";
import axios from "axios";
import Note from "./components/Note";
import Header from "./components/Header";

import { NotesProvider, useNotes } from "./context/NoteContext";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Header />
        <Home />
      </NotesProvider>
    </div>
  );
}

export default App;
