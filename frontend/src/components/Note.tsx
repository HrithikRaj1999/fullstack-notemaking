import { NoteModel } from "../model/noteModel";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, description, createdAt, updatedAt } = note;
  const createdUpdatedText: string =
    updatedAt > createdAt
      ? `Updated:${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`;
  return (
    <Card className="m-6 w-96 bg-yellow-700">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="my-3">
          {title}
        </Typography>
        <Typography className="h-[100px] overflow-y-auto max-h-48 text-muted">
          {description}
        </Typography>
      </CardBody>
      <hr className="my-8 border-blue-gray-50" />
      <CardFooter className="pt-0">
        <Typography>{createdUpdatedText}</Typography>
      </CardFooter>
    </Card>
  );
};

export default Note;
