import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";
import { parseCookies, setCookie } from "nookies";
import { AxiosError } from "axios";

interface childrenProps {
  children: ReactNode;
}
interface userData {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface userLogged {
  username: string;
  img_url: string;
}

export interface IMessage {
  content: string;
}

export interface IListMessage {
  id?: string;
  content?: string;
  User?: {
    username: string;
    img_url: string;
  };
}

type DevChatContextType = {
  user: IUser | null;
  error: string;
  userLogged: userLogged | null;
  listMessage: IListMessage[];
  handleSignIn: (data: userData) => Promise<void>;
  createNewUser: (data: userData) => Promise<void>;
  handleSendNewMessage: (
    data: IMessage,
    handleCategory: string
  ) => Promise<void>;
  getCategory(handleCategory: string): void;
};

export const DevChatContext = createContext({} as DevChatContextType);

export function DevChatProvider({ children }: childrenProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
  const [userLogged, setUserLogged] = useState<userLogged | null>(null);
  const [category, setCategory] = useState("");
  const [listMessage, setListMessage] = useState<IListMessage[]>([]);

  const handleSignIn = async ({ password, username }: userData) => {
    try {
      const userData = await api.post("/login", {
        password,
        username,
      });
      const { token } = userData.data;
      setCookie(undefined, "dev-chat", token, {
        maxAge: 60 * 60 * 24, // 1 dia
      });

      setUser(token);
      api.defaults.headers["Authorization"] = `Bearer ${token}`; //

      Router.push("/rooms/javascript");
    } catch (error: AxiosError | any) {
      if (error.response as AxiosError) {
        setError(error.response.data.message);
      }
    }
  };

  const createNewUser = async ({ username, password }: userData) => {
    try {
      await api.post("users/register", {
        username,
        password,
      });
      Router.push("/");
    } catch (err: AxiosError | any) {
      if (err.response.data.message === "User already exists!") {
        setError("Usuario ja existente!");
      }
      if (err.response.data.message === "Invalid username") {
        setError("Username invalido");
      }
      if (err.response.data.message === "Invalid password") {
        setError("Password invalido");
      }
    }
  };

  const getUserLogged = async () => {
    try {
      const { "dev-chat": token } = parseCookies();
      const response = await api.get("users/logged", {
        headers: {
          Authorization: token as string,
        },
      });

      setUserLogged(response.data);
    } catch (error: AxiosError | any) {
      console.log(error);
    }
  };

  const handleSendNewMessage = async (
    { content }: IMessage,
    handleCategory: string
  ) => {
    try {
      const { "dev-chat": token } = parseCookies();
      console.log(handleCategory);

      await api.post(
        "message",
        { content },
        {
          headers: {
            Authorization: token as string,
          },
          params: {
            category: handleCategory ? handleCategory : "",
          },
        }
      );
    } catch (error) {}
  };

  const filterMessageList = async () => {
    try {
      const { "dev-chat": token } = parseCookies();
      console.log("category", category);

      const response = await api.get("message", {
        headers: {
          Authorization: token as string,
        },

        params: {
          category: category,
        },
      });

      console.log("Hello", response.data);
      setListMessage(response.data);
    } catch (error) {}
  };

  const getCategory = (handleCategory: string) => {
    setCategory(handleCategory);
    console.log(category);
  };

  useEffect(() => {
    filterMessageList();
    getUserLogged();
  }, []);

  return (
    <DevChatContext.Provider
      value={{
        user,
        error,
        userLogged,
        listMessage,
        handleSignIn,
        createNewUser,
        handleSendNewMessage,
        getCategory,
      }}
    >
      {children}
    </DevChatContext.Provider>
  );
}