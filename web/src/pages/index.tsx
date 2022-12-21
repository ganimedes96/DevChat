import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, CSSProperties } from "react";
import { DevChatContext } from "../contexts/devChatContext";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import HashLoader from "react-spinners/HashLoader";
import { resolve } from "path";

const newLoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(5),
});

type NewLoginFormInputs = z.infer<typeof newLoginSchema>;

export default function Home() {
  const { error, handleSignIn } = useContext(DevChatContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewLoginFormInputs>({
    resolver: zodResolver(newLoginSchema),
  });
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
  };
  const signIn = async (data: NewLoginFormInputs) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    handleSignIn(data);
    reset();
  };


  return (
    <>
      <Header />

      <main className="max-w-[1124px] w-full  mx-auto flex justify-between items-center px-10">
        <section className="w-[1/2] ">
          <Image
            className="absolute bottom-0 right-0 scale-x-[-1] opacity-80 -z-10"
            src="/images/blobs.svg"
            alt="bolhas"
            width={350}
            height={350}
          />
          <h1 className="text-3xl font-bold text-gray-200">
            A maior comunidade de devs <br /> do Brasil
          </h1>
          <Image
            src="/images/programador-main.svg"
            width={350}
            height={300}
            alt="um programador sentado em um puf com notbook"
          />
        </section>
        <section className="w-[1/2]">
          <form onSubmit={handleSubmit(signIn)}>
            <div className="flex flex-col items-center justify-center gap-4 text-gray-200">
              <input
                {...register("username")}
                className="bg-transparent border-[1.4px] border-green-500 rounded placeholder:text-sm placeholder:text-gray-300 p-2"
                type="text"
                placeholder="Username do github"
              />
              <input
                {...register("password")}
                className="bg-transparent border-[1.4px] border-green-500 rounded placeholder:text-sm placeholder:text-gray-300 p-2"
                type="password"
                placeholder="Password"
              />
              {error && (
                <p className="text-red-500 text-xs text-start w-full">
                  Usuário ou Senha Inválidos
                </p>
              )}
              <button
                type="submit"
                className="flex items-center justify-center text-gray-100 gap-4 bg-green-500 p-2 w-56 rounded hover:bg-green-600 transition-all  "
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <HashLoader
                    color={"#fff"}
                    loading={true}
                    cssOverride={override}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <>
                    <Image
                      src="/images/enter-room.svg"
                      alt="icone para entrar na sala"
                      width={16}
                      height={16}
                    />
                    <p>Conectar</p>
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center gap-4 text-gray-200 mt-4">
            <div className="w-14 h-px bg-gray-300" />
            <span className="text-sm">ou</span>
            <div className="w-14 h-px bg-gray-300" />
          </div>
          <Link className="flex items-center justify-center" href="/register">
            <p className="text-center border-[1.4px] border-green-500 p-2 mt-4 text-gray-200 w-56 rounded hover:bg-green-500 transition-all  hover:text-gray-100 ">
              Cadastrar
            </p>
          </Link>
        </section>
      </main>
    </>
  );
}
