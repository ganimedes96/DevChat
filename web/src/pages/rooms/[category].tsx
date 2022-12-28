import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as z from "zod";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { PaperPlaneTilt, Trash } from "phosphor-react";
import { DevChatContext, IListMessage } from "../../contexts/devChatContext";
import { api } from "../../services/api";
import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { ModalDeleteRoom } from "../../components/ModalDeleteRoom";

const newMessageSchema = z.object({
  content: z.string().min(1),
});

type NewMessageFormInputs = z.infer<typeof newMessageSchema>;

export default function Rooms() {
  const [historyMessages, setHistoryMessages] = useState<IListMessage[]>([]);
  const [isUserAuthorization, setIsUserAuthorization ] = useState(false)


  const { query } = useRouter();

  const { userLogged, handleSendNewMessage, getCategoryInfo } = useContext(DevChatContext);
  const { register, handleSubmit, reset } = useForm<NewMessageFormInputs>({
    resolver: zodResolver(newMessageSchema),
  });

  const getListMessage = async () => {
    const { "dev-chat": token } = parseCookies();

    const response = await api.get("message", {
      headers: {
        Authorization: token as string,
      },

      params: {
        category: query.category as string,
      },
    });

    setHistoryMessages(response.data);
  };


  
  const handleSubmitMessage = async (data: NewMessageFormInputs) => {
    handleSendNewMessage(data, String(query.category));
    reset();
  };
  console.log(userLogged?.id);
  console.log(getCategoryInfo?.userId);
  
  
  useEffect(() => {
    if (userLogged?.id === getCategoryInfo?.userId) {
      
      setIsUserAuthorization(true)
    } else {setIsUserAuthorization(false)}
    getListMessage();
   
  }, [query.category, isUserAuthorization]);
  
  return (
    <>
      <Header img_url={userLogged?.img_url} username={userLogged?.username} />
      <h2 className="text-center text-green-500 -mb-20">
        # dev.Chat | {query.category}
      </h2>
      <main className="flex items-center justify-between gap-4 px-4 h-screen">
        <Categories />
        <div className="w-full flex flex-col items-center justify-center mt-[4.7rem]">
        <section className="w-full  bg-gray-600 h-[400px] rounded ">
          <div className="flex items-center justify-end gap-4 p-2">
            {isUserAuthorization ? <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button>
                <Trash size={20} color="#32ae19" />                 
                </button>
              </AlertDialog.Trigger>
              <ModalDeleteRoom />
            </AlertDialog.Root>: '' }
          </div>
          <div className="h-[370px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-400 overflow-y-scroll p-4  text-gray-200 text-xs flex flex-col-reverse items-start justify-start ">
            {historyMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-start w-full h-screen mt-32">
                <Image
                  src="/images/noquestions.svg"
                  width={60}
                  height={60}
                  alt="baloes de textos"
                />
                <p className="font-semibold">Nenhuma pergunta por aqui...</p>
              </div>
            ) : (
              historyMessages?.map((data) => (
                <div
                  className="flex  items-center justify-center gap-4 mt-6"
                  key={data.id}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={data.User?.img_url}
                    alt=""
                  />
                  <div>
                    <span className="text-sm font-semibold text-purple-300">
                      {data.User?.username}
                    </span>
                    <p>{data.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

        </section>
          <form
            onSubmit={handleSubmit(handleSubmitMessage)}
            className="flex items-center justify-center gap-2 p-4 w-full"
          >
            <input
              {...register("content")}
              className="w-full text-gray-200 bg-gray-900 rounded-2xl p-2"
              placeholder="Mensagem"
              type="text"
            />
            <button type="submit" className="bg-green-600 p-[5px] rounded-full">
              <PaperPlaneTilt size={26} color="#ffffff" />
            </button>
          </form>

        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "dev-chat": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
