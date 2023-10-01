import { NoteModel } from "../model/noteModel";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { formatDate } from "../utils/formatDate";
import { useMemo, useState } from "react";
import axios from "axios";
import { useNotes } from "../context/NoteContext";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const { notes, setNotes } = useNotes();
  const [isDesEditable, setIsDesEditable] = useState(false);
  const { _id, title, description, createdAt, updatedAt } = note;
  const createdUpdatedText: string = useMemo(() => {
    return updatedAt > createdAt
      ? `Updated: ${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`;
  }, [updatedAt, createdAt]);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${_id}`, {
        withCredentials: true,
      });

      setNotes([...notes.filter((item) => item._id !== _id)]);
    } catch (error) {}
  };
  const handleEditOnBlur = async (value: string, changed: string) => {
    const updatedValue = {
      title: changed === "title" ? value : title,
      description: changed === "description" ? value : description,
    };

    try {
      await axios.put(`http://localhost:5000/api/notes/${_id}`, updatedValue, {
        withCredentials: true,
      });
      const updatedNotes = notes.map((note) =>
        note._id === _id ? { ...note, ...updatedValue } : note
      );
      setNotes([...updatedNotes]);
      setIsDesEditable(false);
      setIsTitleEditable(false);
    } catch (error) {}
  };
  return (
    <Card className="m-6 w-96 hover:shadow-2xl ">
      <CardBody className=" bg-yellow-300">
        {isTitleEditable ? (
          <Input
            crossOrigin={""}
            label="title"
            className="bg-yellow-300"
            onBlur={(e) => {
              handleEditOnBlur(e.target.value, "title");
              setIsTitleEditable(false);
            }}
          />
        ) : (
          <div className="flex justify-between">
            <Typography
              variant="h5"
              color="blue-gray"
              className="my-3"
              onClick={() => setIsTitleEditable(true)}
            >
              {title}
            </Typography>
            <button
              onClick={handleDelete}
              className="bg-transparent font-bold  rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                color="white"
                viewBox="0 0 48 48"
              >
                <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.796625 6 11.086453 6.9162188 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.913547 6.9162187 35.202375 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 8.9726562 18 L 11.125 38.085938 C 11.425 40.887937 13.77575 43 16.59375 43 L 31.40625 43 C 34.22325 43 36.574 40.887938 36.875 38.085938 L 39.027344 18 L 8.9726562 18 z"></path>
              </svg>
            </button>
          </div>
        )}
        {isDesEditable ? (
          <div className="bg-yellow-300 h-[100px] max-h-48">
            <Input
              crossOrigin={""}
              label="Description"
              onBlur={(e) => {
                handleEditOnBlur(e.target.value, "description");
                setIsDesEditable(false);
              }}
            />
          </div>
        ) : (
          <Typography
            className="h-[100px] overflow-y-auto max-h-48 text-muted"
            onClick={() => setIsDesEditable(true)}
          >
            {description}
          </Typography>
        )}
      </CardBody>

      <CardFooter className="pt-0 bg-yellow-100">
        <hr className=" mb-2 border-blue-gray-50  " />
        <Typography>{createdUpdatedText}</Typography>
      </CardFooter>
    </Card>
  );
};

export default Note;
