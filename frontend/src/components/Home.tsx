import { useNotes } from "../context/NoteContext";
import { useUser } from "../context/UserContext";
import Error from "./Error";
import Note from "./Note";

const Home = () => {
  const { notes } = useNotes();
  const { user } = useUser();
  return (
    <>
      {user ? (
        <div className="flex flex-wrap   ">
          {notes.length === 0 ? (
            <Error />
          ) : (
            notes?.map((note) => <Note key={note._id} note={note} />)
          )}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center h-screen">
          <h1 className="text-5xl ">Please Sign In to Add/Edit Notes </h1>
        </div>
      )}
    </>
  );
};

export default Home;
