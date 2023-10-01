import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { useUser } from "../context/UserContext";
import { SignInModal } from "./SignInModal";
import { LoginModal } from "./LogInModal";
import Logout from "./Logout";

const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showLogInModal, setShowLogInLModal] = useState<boolean>(false);
  const { user } = useUser();
  return (
    <div className="flex justify-between p-4  w-full bg-black">
      <span className="text-white text-2xl">Note Me Asap</span>
      {user ? (
        <div className="flex justify-end">
          <Button
            className="bg-white mx-2 text-black"
            onClick={() => setShowModal(true)}
          >
            Add New Notes
          </Button>
          <Logout />
        </div>
      ) : (
        <div className="flex justify-end ">
          <Button
            className="bg-white mx-2 text-black"
            onClick={() => setShowSignUpModal(true)}
          >
            Sign In{" "}
          </Button>
          <Button
            className="bg-white mx-2 text-black"
            onClick={() => setShowLogInLModal(true)}
          >
            Log In
          </Button>
        </div>
      )}

      <Modal showModal={showModal} setShowModal={setShowModal} />
      <SignInModal
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
      />
      <LoginModal
        showLogInModal={showLogInModal}
        setShowLogInModal={setShowLogInLModal}
      />
    </div>
  );
};

export default Header;
