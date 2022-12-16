import { Link } from "phosphor-react";
import { Card } from "./Card";

export const Categories = () => {
  return (
    <aside className="h-[400px] w-[200px] bg-gray-900 rounded">
      <h2 className="text-gray-200 text-center mt-1 font-semibold">
        Categorias
      </h2>
      <div className="flex flex-col text-gray-100 items-center justify-center gap-4 mt-4 p-2">
        <Card category="javascript" path={'javascript'}/>
        <Card category="reactjs" path={'react'}/>
        <Card category="php" path={'php'}/>
        <Card category="python" path={'python'}/>
        <Card category="mysql" path={'mysql'}/>
      </div>
    </aside>
  );
};
