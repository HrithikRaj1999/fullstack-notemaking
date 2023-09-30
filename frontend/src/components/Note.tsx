import { NoteModel } from "../model/noteModel";
import {
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
  const { notes, setLocalNotes } = useNotes();
  const [isDesEditable, setIsDesEditable] = useState(false);
  const { _id, title, description, createdAt, updatedAt } = note;
  const createdUpdatedText: string = useMemo(() => {
    return updatedAt > createdAt
      ? `Updated: ${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`;
  }, [updatedAt, createdAt]);
  const [curTitle, setCurTitle] = useState<string>(title);
  const [curDescription, setCurDescription] = useState<string | undefined>(
    description
  );
  const handleEditOnBlur = async (value: string, changed: string) => {
    console.log(curTitle);
    const updatedValue = {
      title: changed === "title" ? value : title,
      description: changed === "description" ? value : description,
    };

    try {
      await axios.put(`http://localhost:5000/api/notes/${_id}`, updatedValue);
      const index = notes.findIndex((i: any) => i?._id === _id);
      notes.splice(index, 1, { ...notes[index], ...updatedValue });
      setLocalNotes(notes);
      setIsDesEditable(false);
      setIsTitleEditable(false);
    } catch (error) {}
  };
  return (
    <Card className="m-6 w-96 hover:shadow-2xl">
      <CardBody className=" bg-yellow-300">
        {isTitleEditable && !isDesEditable ? (
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
          <Typography
            variant="h5"
            color="blue-gray"
            className="my-3"
            onClick={() => setIsTitleEditable(true)}
          >
            {title}
          </Typography>
        )}
        {isDesEditable && !isTitleEditable ? (
          <Input
            crossOrigin={""}
            type="textArea"
            label="description"
            className="bg-yellow-300"
            onBlur={(e) => {
              handleEditOnBlur(e.target.value, "description");
              setCurDescription(e.target.value);
              setIsDesEditable(false);
            }}
          />
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
