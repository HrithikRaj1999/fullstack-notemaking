import { useEffect, useState } from "react";
import { NoteModel } from "./model/noteModel";
import axios from "axios";
import Note from "./components/Note";
import Header from "./components/Header";

import { NotesProvider, useNotes } from "./context/NoteContext";
import Home from "./components/Home";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NotesProvider>
          <Header />
          <Home />
        </NotesProvider>
      </UserProvider>
    </div>
  );
}

export default App;
