import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { NotesProvider } from "./context/NoteContext";
import { UserProvider } from "./context/UserContext";
import { NewModal } from "./components/NewModal";

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
