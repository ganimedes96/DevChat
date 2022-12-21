import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { DevChatContext } from "../contexts/devChatContext";
import Image from "next/image";
import { Header } from "../components/Header";

const newRegisterSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type NewRegisterFormInputs = z.infer<typeof newRegisterSchema>;

export default function Register() {
  const { error, createNewUser } = useContext(DevChatContext);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<NewRegisterFormInputs>({
    resolver: zodResolver(newRegisterSchema),
  });

  const registerUser = async (data: NewRegisterFormInputs) => {
    console.log(data);
    createNewUser(data);
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
          <form onSubmit={handleSubmit(registerUser)}>
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
                type="text"
                placeholder="Password"
              />
              {error && (
                <p className="text-red-500 text-xs text-start w-full">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="flex items-center justify-center text-gray-100 gap-4 bg-green-500 p-2 w-56 rounded   "
              >
                <Image
                  src="/images/users-white.svg"
                  alt="icone para entrar na sala"
                  width={16}
                  height={16}
                />
                Cadastrar
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
