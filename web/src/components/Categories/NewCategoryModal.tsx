import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { DevChatContext } from "../../contexts/devChatContext";

const newCategorySchema = z.object({
  category: z.string().min(1),
});
type NewCategoryFormInput = z.infer<typeof newCategorySchema>;

export const NewCategoryModal = () => {
    const { createNewCategory, listCategory } = useContext(DevChatContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewCategoryFormInput>({
    resolver: zodResolver(newCategorySchema),
  });

  const handleCreateNewCategory = async (data: NewCategoryFormInput) => {
    createNewCategory(data)
    reset();
  };


  return (
    <Dialog.Portal>
      <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
      <Dialog.Content className="min-w-[28rem] rounded py-10 px-12 bg-gray-700 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Close className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
          <X size={24} />
        </Dialog.Close>
        <Dialog.Title className="text-gray-200">Nova categoria</Dialog.Title>
        <form
          className="mt-8 flex flex-col gap-4 "
          onSubmit={handleSubmit(handleCreateNewCategory)}
        >
          <input
            className="rounded border-0 bg-gray-900 text-gray-200 p-4 placeholder:text-gray-300 "
            type="text"
            {...register("category")}
            placeholder="Categoria"
            required
          />

          {/* {error && <span className='text-red-500'>{error}</span>} */}
          <button
            className="rounded border-spacing-0 bg-green-600 px-5 mt-6 h-[58px] text-gray-200 cursor-pointer hover:bg-green-700 transition-all font-semibold text-xl disabled:opacity-60 "
            type="submit"
            disabled={isSubmitting}
          >
            Criar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
