import Image from "next/image";
import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { useContext } from "react";
import { DevChatContext } from "../../contexts/devChatContext";

export default function Rooms() {
  const { userLogged } = useContext(DevChatContext);

  return (
    <>
      <Header img_url={userLogged?.img_url} username={userLogged?.username} />
      <main className=" max-w-[1100px] mx-auto flex items-center justify-between gap-4 px-4">
        <Categories />
        <section className="w-[1/2] flex flex-col items-center justify-center gap-10">
          <Image
            className="absolute bottom-0 right-0 scale-x-[-1] opacity-80 -z-10"
            src="/images/blobs.svg"
            alt="bolhas"
            width={350}
            height={350}
          />
          <h1 className="text-3xl font-bold text-gray-200">
            Escolha uma categoria
          </h1>
          <Image
            className="scale-x-[-1]"
            src="/images/chat.svg"
            width={350}
            height={300}
            alt="um programador sentado em um puf com notbook"
          />
        </section>
      </main>
    </>
  );
}
