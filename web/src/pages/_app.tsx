import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DevChatProvider } from "../contexts/devChatContext";
import "../styles/globals.css";
import { Header } from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DevChatProvider>
      
      <Component {...pageProps} />
    </DevChatProvider>
  );
}
