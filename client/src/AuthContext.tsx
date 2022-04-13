import {
  createContext,
  useState,
  useEffect,
  FC,
  useMemo,
  useContext,
} from "react";
import { iUser } from "./types";

const AuthContext = createContext<AuthProps>(undefined!);

type AuthProps = {
  user: iUser;
  setUser: Function;
};

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<iUser>();
  const memoChildren = useMemo(() => children, [children]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user!, setUser: setUser }}>
      {memoChildren}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuthContext };
