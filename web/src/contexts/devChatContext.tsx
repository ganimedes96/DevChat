import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";
import { setCookie } from "nookies";
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

type DevChatContextType = {
  user: IUser | null;
  error: string;
  handleSignIn: (data: userData) => Promise<void>;
  createNewUser: (data: userData) => Promise<void>;
};

export const DevChatContext = createContext({} as DevChatContextType);

export function DevChatProvider({ children }: childrenProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
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

  return (
    <DevChatContext.Provider
      value={{ user, error, handleSignIn, createNewUser }}
    >
      {children}
    </DevChatContext.Provider>
  );
}
