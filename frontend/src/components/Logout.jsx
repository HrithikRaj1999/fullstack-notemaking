import { Button } from "@material-tailwind/react";
import { useUser } from "../context/UserContext";
import axios from "axios";

const Logout = () => {
  const { setUser } = useUser();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/logout");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button className="mx-2" onClick={handleLogout}>
      Log out
    </Button>
  );
};

export default Logout;
