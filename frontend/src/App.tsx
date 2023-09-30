import { useEffect, useState } from "react";
import { NoteModel } from "./model/noteModel";
import axios from "axios";
import Note from "./components/Note";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/notes/");
      setNotes([...data.notes]);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="flex flex-wrap justify-center ">
        {notes.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default App;
