import { PaperPlaneTilt } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { DevChatContext, IListMessage } from "../../contexts/devChatContext";
import { api } from "../../services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const newMessageSchema = z.object({
  content: z.string().min(3),
});

type NewMessageFormInputs = z.infer<typeof newMessageSchema>;

export default function Rooms() {
  const {query} = useRouter() 
  const category 
  const [historyMessages, setHistoryMessages] = useState<IListMessage[]>([])
  
  const { userLogged, handleSendNewMessage, getCategory } =
    useContext(DevChatContext);
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
        category: 'ff',
      },
    });
    console.log(historyMessages);
    
    setHistoryMessages(response.data)
  }

  const handleSubmitMessage = async (data: NewMessageFormInputs) => {
    handleSendNewMessage(data, "javascript");
    setHistoryMessages((state) => [data, ...state])
    reset();
  };
  


  
  useEffect(() => {
    getCategory('javascript')
    getListMessage()
    historyMessages
  }, [getCategory]);

  return (
    <>
      <Header img_url={userLogged?.img_url} username={userLogged?.username} />
      <main className="flex items-center justify-between gap-4 px-4">
        <Categories />
        <section className="w-full  bg-gray-600 h-[400px] rounded ">
          <div className="h-full overflow-hidden overflow-y-scroll   p-4  text-gray-200 text-xs flex flex-col-reverse items-start justify-start ">
            {historyMessages?.map((data) => (
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
            ))}
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitMessage)}
            className="mt-4 flex items-center justify-center gap-2"
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
        </section>
      </main>
    </>
  );
}
