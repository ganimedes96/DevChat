import { useContext, useState } from "react";
import { DevChatContext } from "../../contexts/devChatContext";
import { Card } from "./Card";
import {useRouter} from 'next/router'

export const Categories = () => {
  const { listCategory } = useContext(DevChatContext);
  

  return (
    <aside className="h-[400px] w-[200px] bg-gray-900 rounded">
      <h2 className="text-gray-200 text-center mt-1 font-semibold">
        Categorias
      </h2>
      <div className="flex flex-col text-gray-100 items-center justify-center gap-4 mt-4 p-2">
        {listCategory.map((category) => (
          <Card
          
            key={category.id}
            category={category.category}
            path={category.category}
          />
        ))}
      </div>
    </aside>
  );
};
