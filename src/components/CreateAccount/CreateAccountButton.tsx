"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";

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
 const buttonDisabled = isSubmitting || isLoading || isFirstPageInvalid();
 function isFirstPageInvalid() {
  const name = form.watch("name");
  const email = form.watch("email");
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  if (name) {
   if (name.length > 50) return true;
  }
  if (email) {
   if (email.length > 100) return true;
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return true;
  }
  if (password) {
   if (password.length < 6 || password.length > 50) return true;
  }
  if (confirmPassword) {
   if (confirmPassword.length < 6 || confirmPassword.length > 50) return true;
  }
  if (password !== confirmPassword) return true;
  return !name || !email || !password;
 }
 //todo: make input reusable, add error messages
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
     <div className="bg-white dark:bg-black rounded-2xl p-4 relative w-full h-full sm:w-[80%] sm:h-[80%] md:max-w-[600px] md:max-h-[600px]">
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
        <div className="max-w-[80%] mx-auto w-full flex flex-col gap-3 h-full">
         {page === 1 && (
          <>
           <div className="font-bold text-xl">
            {page === 1 ? "Step 1 of 2" : "Step 2 of 2"}
           </div>
           <h2 className="text-3xl font-bold mt-3">
            {page === 1 ? "Create your Account" : "Finalize your Account"}
           </h2>
           <label
            htmlFor="name"
            className="relative group p-3 border border-mainGray/80 rounded w-full focus-within:outline focus-within:outline-1 focus-within:outline-main mt-3"
           >
            <div
             className={cn(
              "absolute top-[18px] left-3 text-mainGray/80 w-fit select-none pointer-events-none transition-all duration-200 group-focus-within:top-1 group-focus-within:text-sm group-focus-within:text-main",
              !!form.watch("name") && "top-1 text-sm"
             )}
            >
             Name
            </div>
            <input
             id="name"
             className="outline-none mt-3 w-full bg-white dark:bg-black"
             {...form.register("name")}
            />
            <div className="text-sm text-mainGray/80 absolute top-1 right-3 hidden group-focus-within:block">
             0 / 50
            </div>
           </label>
           <label
            htmlFor="email"
            className="relative group p-3 border border-mainGray/80 rounded w-full focus-within:outline focus-within:outline-1 focus-within:outline-main mt-3"
           >
            <div
             className={cn(
              "absolute top-[18px] left-3 text-mainGray/80 w-fit select-none pointer-events-none transition-all duration-200 group-focus-within:top-1 group-focus-within:text-sm group-focus-within:text-main",
              !!form.watch("email") && "top-1 text-sm"
             )}
            >
             Email
            </div>
            <input
             id="email"
             type="email"
             className="outline-none mt-3 w-full bg-white dark:bg-black"
             {...form.register("email")}
            />
           </label>
           <label
            htmlFor="password"
            className="relative group p-3 border border-mainGray/80 rounded w-full focus-within:outline focus-within:outline-1 focus-within:outline-main mt-3"
           >
            <div
             className={cn(
              "absolute top-[18px] left-3 text-mainGray/80 w-fit select-none pointer-events-none transition-all duration-200 group-focus-within:top-1 group-focus-within:text-sm group-focus-within:text-main",
              !!form.watch("password") && "top-1 text-sm"
             )}
            >
             Password
            </div>
            <input
             id="password"
             type="password"
             className="outline-none mt-3 w-full bg-white dark:bg-black"
             {...form.register("password")}
            />
           </label>
           <label
            htmlFor="confirmPassword"
            className="relative group p-3 border border-mainGray/80 rounded w-full focus-within:outline focus-within:outline-1 focus-within:outline-main mt-3"
           >
            <div
             className={cn(
              "absolute top-[18px] left-3 text-mainGray/80 w-fit select-none pointer-events-none transition-all duration-200 group-focus-within:top-1 group-focus-within:text-sm group-focus-within:text-main",
              !!form.watch("confirmPassword") && "top-1 text-sm"
             )}
            >
             Confirm Password
            </div>
            <input
             id="confirmPassword"
             className="outline-none mt-3 w-full bg-white dark:bg-black"
             type="password"
             {...form.register("confirmPassword")}
            />
           </label>
          </>
         )}
         <button
          className={cn(
           "block border mt-auto py-4 rounded-full bg-black text-white dark:bg-white dark:text-black mb-2 font-bold",
           buttonDisabled && "opacity-50 cursor-default"
          )}
          onClick={() => setPage(2)}
          disabled={buttonDisabled}
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
