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
  setNotes: React.Dispatch<React.SetStateAction<NoteModel[]>>;
}

// Create Context
const NotesContext = createContext({} as NotesContextType);

// Make custom hook for using this context
export const useNotes = () => useContext(NotesContext);

// This will be used in app.tsx
export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/notes/");
      setNotes([...data.notes]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
