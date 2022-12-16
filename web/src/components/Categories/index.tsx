import { Link } from "phosphor-react";
import { Card } from "./Card";

export const Categories = () => {
  return (
    <aside className="h-[400px] w-[200px] bg-gray-900 rounded">
      <h2 className="text-gray-200 text-center mt-1 font-semibold">
        Categorias
      </h2>
      <div className="flex flex-col text-gray-100 items-center justify-center gap-4 mt-4 p-2">
        <Card category="Javascript" path={'javascript'}/>
        <Card category="React JS" path={'reactjs'}/>
        <Card category="PHP" path={'php'}/>
        <Card category="Python" path={'python'}/>
        <Card category="Mysql" path={'mysql'}/>
      </div>
    </aside>
  );
};
