import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
