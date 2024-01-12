"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IoClose, IoArrowBackSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { isFirstPageInvalid, isSecondPageInvalid } from "./pageValidFunction";
import { createPortal } from "react-dom";
import ModalPageOne from "./ModalPageOne";
import ModalPageTwo from "./ModalPageTwo";
import { existingEmailSearchAction } from "@/actions/auth-actions";

const getPageErrors = (pageResult: any) => {
 const { errors } =
  typeof pageResult === "boolean" ? { errors: {} } : pageResult;
 return errors;
};

const CreateAccountButton = () => {
 const [showModal, setShowModal] = useState(false);
 const [page, setPage] = useState(1);
 const [loading, setLoading] = useState(false);
 const [invalidEmails, setInvalidEmails] = useState<string[]>([]);
 const modalRef = useRef<HTMLDivElement | null>(null);
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
  setLoading(true);
  console.log(data);
  setLoading(false);
 };
 async function checkEmail(email: string) {
  setLoading(true);
  const action = await existingEmailSearchAction(email);
  if (action.error) {
   setInvalidEmails([...invalidEmails, email]);
  } else {
   setPage(2);
  }
  setLoading(false);
 }
 const { isSubmitting, isLoading } = form.formState;
 const isFirstPageResult = isFirstPageInvalid(form);
 const isSecondPageResult = isSecondPageInvalid(form);
 const isFirstPageErrors = getPageErrors(isFirstPageResult);
 const isSecondPageErrors = getPageErrors(isSecondPageResult);
 const firstButtonDisabled =
  isSubmitting ||
  isLoading ||
  isFirstPageInvalid(form) ||
  loading ||
  invalidEmails.includes(form.watch("email"));
 const secondButtonDisabled =
  isSubmitting || isLoading || isSecondPageInvalid(form) || loading;
 useEffect(() => {
  const handleKeyDown = (e: any) => {
   if (e.key === "Tab" && modalRef.current) {
    const modalElements = modalRef.current.querySelectorAll(
     'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = modalElements[0] as HTMLElement;
    const lastElement = modalElements[modalElements.length - 1] as HTMLElement;
    if (!e.shiftKey && document.activeElement === lastElement) {
     e.preventDefault();
     firstElement.focus();
    } else if (e.shiftKey && document.activeElement === firstElement) {
     e.preventDefault();
     lastElement.focus();
    }
   }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, []);
 return (
  <>
   <button
    onClick={() => setShowModal(true)}
    className="bg-main text-white my-1 rounded-full py-2 px-4 w-full font-semibold hover:bg-main/90 transition-all duration-150 border border-main"
   >
    Create account
   </button>
   {showModal &&
    createPortal(
     <div className="fixed w-screen h-screen inset-0 bg-[#5b708366] flex items-center justify-center z-[100]">
      <div
       ref={modalRef}
       className="bg-white dark:bg-black rounded-2xl p-4 relative w-full h-full sm:w-[80%] sm:h-[80%] md:max-w-[600px] md:max-h-[650px]"
      >
       {page === 1 ? (
        <button
         onClick={() => {
          setShowModal(false);
          setPage(1);
          form.reset();
         }}
         className="absolute top-[12px] left-2 p-2 rounded-full"
        >
         <IoClose className="w-5 h-5" />
        </button>
       ) : (
        <button
         onClick={() => {
          setPage(1);
         }}
         className="absolute top-[12px] left-2 p-2 rounded-full"
        >
         <IoArrowBackSharp className="w-5 h-5" />
        </button>
       )}
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
         <div className="max-w-[80%] mx-auto w-full flex flex-col gap-6 h-full">
          {page === 1 && (
           <ModalPageOne
            form={form}
            errors={isFirstPageErrors}
            emailExistError={invalidEmails.includes(form.watch("email"))}
           />
          )}
          {page === 2 && (
           <ModalPageTwo form={form} errors={isSecondPageErrors} />
          )}
          {page === 1 && (
           <button
            className={cn(
             "block border mt-auto py-4 rounded-full bg-black text-white dark:bg-white dark:text-black mb-2 font-bold",
             firstButtonDisabled && "opacity-50 cursor-default"
            )}
            onClick={async () => {
             await checkEmail(form.watch("email"));
            }}
            disabled={!!firstButtonDisabled}
            type="button"
           >
            Next
           </button>
          )}
          {page === 2 && (
           <button
            className={cn(
             "block border mt-auto py-4 rounded-full bg-main text-white dark:bg-main dark:text-white mb-2 font-bold",
             secondButtonDisabled && "opacity-50 cursor-default"
            )}
            onClick={form.handleSubmit(onSubmit)}
            disabled={!!secondButtonDisabled}
           >
            Create account
           </button>
          )}
         </div>
        </form>
       </Form>
      </div>
     </div>,
     document.body
    )}
  </>
 );
};
export default CreateAccountButton;
