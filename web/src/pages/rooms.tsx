import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PaperPlaneTilt } from "phosphor-react";

export default function Rooms() {
  const TAGS = Array.from({ length: 15 }).map(
    (_, i, a) => `Hello word!!${a.length - i}`
  );
  return (
    <main className="flex items-center justify-between gap-4 px-4">
      <aside className="h-[400px] w-[200px] bg-gray-900 rounded">
        <h2 className="text-gray-200 text-center mt-1 font-semibold">
          Categorias
        </h2>
        <RadioGroup.Root className="flex flex-col text-gray-100 items-center justify-center gap-4 mt-4 p-2">
          <RadioGroup.Item
            className="bg-green-600 w-full p-1 rounded "
            value="javascript"
          >
            <span>Javascript</span>
          </RadioGroup.Item>
          <RadioGroup.Item
            className="bg-green-600 w-full p-1 rounded "
            value="reactjs"
          >
            <span>React Js</span>
          </RadioGroup.Item>
          <RadioGroup.Item
            className="bg-green-600 w-full p-1 rounded "
            value="tailwindcss"
          >
            <span>TailwindCSS</span>
          </RadioGroup.Item>
          <RadioGroup.Item
            className="bg-green-600 w-full p-1 rounded "
            value="nodejs"
          >
            <span>NodeJS</span>
          </RadioGroup.Item>
          <RadioGroup.Item
            className="bg-green-600 w-full p-1 rounded "
            value="mysql"
          >
            <span>Mysql</span>
          </RadioGroup.Item>
        </RadioGroup.Root>
      </aside>
      <section className="w-full  bg-gray-600 h-[400px] rounded ">
        <div className="h-32 scrollbar scrollbar-thumb-custom scrollbar-track-custom-light overflow-hidden overflow-y-scroll   p-4  text-gray-200 text-xs flex flex-col-reverse items-start justify-start ">
          {TAGS.map((tag) => (
            <div className="Tag" key={tag}>
              {tag}
            </div>
          ))}
        </div>

        <form action="" className="mt-4 flex items-center justify-center gap-2">
          <input
            className="w-full text-gray-200 bg-gray-900 rounded-2xl p-2"
            placeholder="Mensagem"
            type="text"
            name=""
            id=""
          />
          <button className="bg-green-600 p-[5px] rounded-full">
            <PaperPlaneTilt size={26} color="#ffffff" />
          </button>
        </form>
      </section>
    </main>
  );
}
