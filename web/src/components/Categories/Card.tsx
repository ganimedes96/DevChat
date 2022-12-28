import Link from "next/link";
import { useContext, useEffect } from "react";
import { DevChatContext } from "../../contexts/devChatContext";

interface CardProps {
  path?: string;
  category: string
  userId: string;
  
}

export const Card = ({category,userId, path,}: CardProps) => {
  const { handleGetCategoryInfo } = useContext(DevChatContext);
  const handleCategoryInfo = () => {
   const categoryInfo = {
      category,
      userId
   }
   handleGetCategoryInfo(categoryInfo)
  } 
 
  return (
    <Link className="w-full" href={`/rooms/${category}`}>
      <button onClick={handleCategoryInfo} className={`bg-green-600 p-1 rounded text-center font-semibold w-full`}>
        <h3>{category}</h3>
      </button>
    </Link>
  );
};
