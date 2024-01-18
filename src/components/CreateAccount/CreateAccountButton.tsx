"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import {
 existingEmailSearchAction,
 existingUsernameSearchAction,
 registerAction,
} from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import HideScroll from "../HideScroll";
import FocusTrap from "focus-trap-react";
import { Puff } from "react-loader-spinner";

const getPageErrors = (pageResult: any) => {
 const { errors } =
  typeof pageResult === "boolean" ? { errors: {} } : pageResult;
 return errors;
};

const CreateAccountButton = ({ homepage }: { homepage?: boolean }) => {
 const router = useRouter();
 const [showModal, setShowModal] = useState(false);
 const [page, setPage] = useState(1);
 const [loading, setLoading] = useState(false);
 const [invalidEmails, setInvalidEmails] = useState<string[]>([]);
 const [invalidUsernames, setInvalidUsernames] = useState<string[]>([]);
 const [validEmails, setValidEmails] = useState<string[]>([]);
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
  const action = await registerAction(data);
  //todo: remove line under if credentialsProvider starts working
  if (action.success) {
   window.location.reload();
   return;
  }
  setLoading(false);
 };
 async function checkEmail(email: string) {
  if (validEmails.includes(email)) {
   setPage(2);
   return;
  }
  setLoading(true);
  const action = await existingEmailSearchAction(email);
  if (action.error) {
   setInvalidEmails([...invalidEmails, email]);
  } else {
   setValidEmails([...validEmails, email]);
   setPage(2);
  }
  setLoading(false);
 }
 async function checkUsername(username: string) {
  setLoading(true);
  const action = await existingUsernameSearchAction(username);
  if (action.error) {
   setInvalidUsernames([...invalidUsernames, username]);
  } else {
   form.handleSubmit(onSubmit)();
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
  isSubmitting ||
  isLoading ||
  isSecondPageInvalid(form) ||
  loading ||
  invalidUsernames.includes(form.watch("username"));
 const closeModal = useCallback(() => {
  setShowModal(false);
  setPage(1);
  form.reset();
  setInvalidEmails([]);
  setInvalidUsernames([]);
 }, [form]);
 useEffect(() => {
  if (!showModal) return;
  const handleKeyDown = (e: any) => {
   if (e.key === "Escape" && page === 1) {
    closeModal();
   }
   if (e.key === "Escape" && page === 2) {
    setPage(1);
   }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [closeModal, showModal, page]);
 return (
  <>
   {!homepage ? (
    <button
     onClick={() => setShowModal(true)}
     className="bg-main text-white my-1 rounded-full py-2 px-4 w-full font-semibold hover:bg-main/90 transition-all duration-150 border border-main"
    >
     Create account
    </button>
   ) : (
    <button
     onClick={() => setShowModal(true)}
     className="bg-white text-black my-1 rounded-full py-2 px-4 font-semibold hover:bg-black/5 dark:hover:bg-white/90 transition-all duration-150 border border-black/30 dark:border-white w-[93%]"
    >
     Create account
    </button>
   )}
   {showModal &&
    createPortal(
     <>
      <HideScroll>
       <FocusTrap>
        <div className="fixed w-screen h-screen inset-0 bg-slate-600/80 dark:bg-[#5b708366] flex items-center justify-center z-[100]">
         <div
          ref={modalRef}
          className="bg-white dark:bg-black rounded-2xl p-4 relative w-full h-full sm:w-[80%] sm:h-[80%] md:max-w-[600px] md:max-h-[650px]"
         >
          {page === 1 ? (
           <button
            onClick={closeModal}
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
              <ModalPageTwo
               form={form}
               errors={isSecondPageErrors}
               userExistError={invalidUsernames.includes(
                form.watch("username")
               )}
              />
             )}
             {page === 1 && (
              <button
               className={cn(
                "border mt-auto py-4 rounded-full bg-black text-white dark:bg-white dark:text-black mb-2 font-bold max-h-[58px] flex items-center justify-center",
                firstButtonDisabled && "opacity-50 cursor-default"
               )}
               onClick={async () => {
                await checkEmail(form.watch("email"));
               }}
               disabled={!!firstButtonDisabled}
               type="button"
              >
               {loading ? (
                <Puff
                 visible={true}
                 height="40"
                 width="40"
                 color="#1d9bf0"
                 ariaLabel="puff-loading"
                />
               ) : (
                "Next"
               )}
              </button>
             )}
             {page === 2 && (
              <button
               className={cn(
                "border mt-auto py-4 rounded-full bg-main text-white dark:bg-main dark:text-white mb-2 font-bold max-h-[58px] flex items-center justify-center",
                secondButtonDisabled && "opacity-50 cursor-default"
               )}
               onClick={async () => {
                await checkUsername(form.watch("username"));
               }}
               disabled={!!secondButtonDisabled}
               type="submit"
              >
               {loading ? (
                <Puff
                 visible={true}
                 height="40"
                 width="40"
                 color="#fff"
                 ariaLabel="puff-loading"
                />
               ) : (
                "Create account"
               )}
              </button>
             )}
            </div>
           </form>
          </Form>
         </div>
        </div>
       </FocusTrap>
      </HideScroll>
     </>,
     document.body
    )}
  </>
 );
};
export default CreateAccountButton;
