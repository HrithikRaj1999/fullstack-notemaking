import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NoteModel } from "../model/noteModel";

interface NotesProviderProps {
  children: ReactNode;
}

interface NotesContextType {
  notes: NoteModel[];
  setLocalNotes: React.Dispatch<React.SetStateAction<NoteModel[]>>;
}

//create Context
const NotesContext = createContext({} as NotesContextType);

//make custom hook for using this context
export const useNotes = () => useContext(NotesContext);

//this will be used in app.tsx
export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [localNotes, setLocalNotes] = useState<NoteModel[]>([]);
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/notes/");
      setNotes([...data.notes]);
      console.log(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [localNotes]);

  return (
    <NotesContext.Provider value={{ notes, setLocalNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
