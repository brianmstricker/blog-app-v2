"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import ModalPage from "./ModalPage";
import { isFirstPageInvalid } from "./pageValidFunction";

const CreateAccountButton = () => {
 const [showModal, setShowModal] = useState(false);
 const [page, setPage] = useState(1);
 const form = useForm<z.infer<typeof RegisterSchema>>({
  resolver: zodResolver(RegisterSchema),
  defaultValues: {
   name: "",
   username: "",
   handle: "",
   email: "",
   password: "",
  },
 });
 const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
  console.log(data);
 };
 const { isSubmitting, isLoading } = form.formState;
 const isFirstPageResult = isFirstPageInvalid(form);
 const buttonDisabled = isSubmitting || isLoading || isFirstPageInvalid(form);
 const { errors } =
  typeof isFirstPageResult === "boolean" ? { errors: {} } : isFirstPageResult;
 // console.log(form.getValues());
 function onFirstPageSubmit() {
  if (isFirstPageInvalid(form)) {
   return;
  }
  setPage(2);
 }
 return (
  <>
   <button
    onClick={() => setShowModal(true)}
    className="bg-main text-white my-1 rounded-full py-2 px-4 w-full font-semibold hover:bg-main/90 transition-all duration-150 border border-main"
   >
    Create account
   </button>
   {showModal && (
    <div className="fixed w-screen h-screen inset-0 bg-[#5b708366] flex items-center justify-center z-[100]">
     <div className="bg-white dark:bg-black rounded-2xl p-4 relative w-full h-full sm:w-[80%] sm:h-[80%] md:max-w-[600px] md:max-h-[650px]">
      <button
       onClick={() => {
        setShowModal(false);
        setPage(1);
        form.reset();
       }}
       className="absolute top-2 left-2 p-2 rounded-full"
      >
       <IoClose />
      </button>
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="max-w-[80%] mx-auto w-full flex flex-col gap-6 h-full">
         {page === 1 && <ModalPage page={page} form={form} errors={errors} />}
         <button
          className={cn(
           "block border mt-auto py-4 rounded-full bg-black text-white dark:bg-white dark:text-black mb-2 font-bold",
           buttonDisabled && "opacity-50 cursor-default"
          )}
          onClick={onFirstPageSubmit}
          disabled={!!buttonDisabled}
         >
          Next
         </button>
        </div>
       </form>
      </Form>
     </div>
    </div>
   )}
  </>
 );
};
export default CreateAccountButton;
