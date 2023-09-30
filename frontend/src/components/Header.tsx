import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Modal } from "./Modal";

const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="flex justify-between p-4  w-full bg-black">
      <span className="text-white text-2xl">Welcome to Note Me !</span>
      <Button
        className="bg-white text-black"
        onClick={() => setShowModal(true)}
      >
        Add New Notes
      </Button>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Header;
