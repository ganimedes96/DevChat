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
  id?: string;
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

export interface ICategory {
  category: string;
}

interface ICategoryInfo {
  id?: string;
  category: string;
  userId: string;
}

type DevChatContextType = {
  user: IUser | null;
  error: string;
  listCategory: ICategoryInfo[];
  userLogged: userLogged | null;
  getCategoryInfo: ICategoryInfo | null;
  handleSignIn: (data: userData) => Promise<void>;
  createNewUser: (data: userData) => Promise<void>;
  handleSendNewMessage: (
    data: IMessage,
    handleCategory: string
  ) => Promise<void>;
  createNewCategory: (data: ICategory) => Promise<void>;
  handleGetCategoryInfo: (data: ICategoryInfo) => void;
  handleDeleteRoom: (room: string) => Promise<void>;
};

export const DevChatContext = createContext({} as DevChatContextType);

export function DevChatProvider({ children }: childrenProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
  const [userLogged, setUserLogged] = useState<userLogged | null>(null);
  const [listCategory, setListCategory] = useState<ICategoryInfo[]>([]);
  const [getCategoryInfo, setGetCategoryInfo] = useState<ICategoryInfo | null>(
    null
  );

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
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/rooms");
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

      await api.post(
        "message",
        { content },
        {
          headers: { Authorization: token as string },
          params: {
            category: handleCategory ? handleCategory : "",
          },
        }
      );
    } catch (error) {}
  };

  const getCategoryList = async () => {
    try {
      const { "dev-chat": token } = parseCookies();

      const response = await api.get("category", {
        headers: {
          Authorization: token as string,
        },
      });

      setListCategory(response.data);
    } catch (error) {}
  };

  const createNewCategory = async ({ category }: ICategory) => {
    try {
      const { "dev-chat": token } = parseCookies();
      await api.post(
        "category/register",
        { category },
        { headers: { Authorization: token as string } }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetCategoryInfo = (data: ICategoryInfo) => {
    setGetCategoryInfo(data);
  };

  const handleDeleteRoom = async (room: string) => {
    const { "dev-chat": token } = parseCookies();
    await api.get(`/category/${room}`, {
      headers: { Authorization: token as string },
    });
    Router.push("/rooms");
  };

  useEffect(() => {
    getUserLogged();
    getCategoryList();
  }, []);

  return (
    <DevChatContext.Provider
      value={{
        user,
        error,
        listCategory,
        userLogged,
        getCategoryInfo,
        handleSignIn,
        createNewUser,
        handleSendNewMessage,
        handleGetCategoryInfo,
        createNewCategory,
        handleDeleteRoom,
      }}
    >
      {children}
    </DevChatContext.Provider>
  );
}
