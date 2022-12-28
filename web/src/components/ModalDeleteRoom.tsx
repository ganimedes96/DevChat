import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useContext } from "react";
import { DevChatContext } from "../contexts/devChatContext";

interface props {}

export const ModalDeleteRoom = () => {
  const { handleDeleteRoom, getCategoryInfo } = useContext(DevChatContext);

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
      <AlertDialog.Content className="min-w-[28rem] rounded py-10 px-12 bg-gray-900 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <AlertDialog.Title className="text-gray-200 text-center font-semibold text-xl">
          Tem certeza que deseja excluir essa sala ?
        </AlertDialog.Title>
        <div className="flex items-center justify-center gap-4 mt-8">
          <AlertDialog.Cancel asChild>
            <button className="border-2 border-gray-400 p-1 text-gray-300 rounded bg-gray-100">
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={ () => handleDeleteRoom(String(getCategoryInfo?.category))} className="bg-red-700 text-red-100 p-1 rounded ">
              Sim, Excluir sala
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
};
