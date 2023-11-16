import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NewModal } from "../components/NewModal";

interface UserProviderProps {
  children: ReactNode;
}

interface UserType {
  username: string;
  email: string;
}
interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

// Create Context
const UserContext = createContext({} as UserContextType);

// Make custom hook for using this context
export const useUser = () => useContext(UserContext);

// This will be used in app.tsx
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  //console.log({ useContext: user });
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });
      //console.log({ data });
      setUser({ ...data });
    } catch (error) {
      //console.log(error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    localStorage.openpages = Date.now();

    window.addEventListener("storage", function (e) {
      if (e.key === "openpages") {
        localStorage.page_available = Date.now();
        localStorage.userId = user?.email;
      }
      if (e.key === "page_available") {
        setShowModal(true);
        setUser(null)
      }
    });
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);
  if (showModal)
    return <NewModal showModal={showModal} setShowModal={setShowModal} />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
