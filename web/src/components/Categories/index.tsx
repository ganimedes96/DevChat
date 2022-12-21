import { useContext, useState } from "react";
import { DevChatContext } from "../../contexts/devChatContext";
import { Card } from "./Card";
import { Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { NewCategoryModal } from "./NewCategoryModal";

export const Categories = () => {
  const { listCategory } = useContext(DevChatContext);

  return (
    <aside className="h-[400px] w-[200px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-400   overflow-y-auto  bg-gray-900 rounded">
      <h2 className="text-gray-200 text-center mt-1 font-semibold">
        Categorias
      </h2>
      <div className=" flex flex-col text-gray-100 items-center justify-center gap-4 mt-4 p-4 pl-2">
        {listCategory.map((category) => (
          <Card
            key={category.id}
            category={category.category}
            path={category.category}
          />
        ))}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="w-full flex items-center justify-center bg-green-600 p-1 rounded text-center font-semibold hover:bg-green-800 transition-all">
              <Plus size={20} />
            </button>
          </Dialog.Trigger>
          <NewCategoryModal />
        </Dialog.Root>
      </div>
    </aside>
  );
};
