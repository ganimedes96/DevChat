import Image from "next/image";
import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { DevChatContext, IListMessage } from "../../contexts/devChatContext";
import { api } from "../../services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function Rooms() {
  const { query } = useRouter();
  const category = JSON.stringify(query.category);
  console.log("dfff", typeof category);

  const [historyMessages, setHistoryMessages] = useState<IListMessage[]>([]);

  const { userLogged } = useContext(DevChatContext);

  const getListMessage = async () => {
    const { "dev-chat": token } = parseCookies();

    const response = await api.get("message", {
      headers: {
        Authorization: token as string,
      },

      params: {
        category: "reactjs",
      },
    });
    console.log(response.data);

    setHistoryMessages(response.data);
  };

  useEffect(() => {
    getListMessage();
    historyMessages;
  }, []);

  return (
    <>
      <Header img_url={userLogged?.img_url} username={userLogged?.username} />
      <main className="flex items-center justify-between gap-4 px-4">
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { "ngcash-token": token } = parseCookies(ctx);

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
