"use client";
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
import { Input } from "@/components/ui/input";
import { UsernameHandleSchema } from "@/schemas";
import Image from "next/image";

const UsernameHandleForm = ({
 userImage,
}: {
 userImage: string | null | undefined;
}) => {
 const form = useForm<z.infer<typeof UsernameHandleSchema>>({
  resolver: zodResolver(UsernameHandleSchema),
  defaultValues: {
   username: "",
   handle: "",
  },
 });
 const onSubmit = (data: z.infer<typeof UsernameHandleSchema>) => {
  console.log(data);
 };
 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
    <FormField
     control={form.control}
     name="username"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Username</FormLabel>
       <FormControl>
        <Input placeholder="jimbo42" {...field} />
       </FormControl>
       <FormDescription>
        This is your display name, which must be unique.
       </FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="handle"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Handle</FormLabel>
       <FormControl>
        <Input placeholder="@tromboneMan😱" {...field} />
       </FormControl>
       <FormDescription>
        This is your handle, which can be pretty much anything.
       </FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />
    <div
     className="flex items-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 p-3 rounded-full w-fit mx-auto"
     tabIndex={0}
    >
     {!userImage ? (
      <div className="w-11 h-11 rounded-full bg-blue-600" />
     ) : (
      <div className="relative w-11 h-11 rounded-full">
       <Image
        src={userImage}
        alt="user PFP"
        fill
        className="rounded-full"
        sizes="44px"
       />
      </div>
     )}
     <div className="flex flex-1 flex-col ml-4">
      <span className="font-bold text-[14px] leading-[18px]">jimbo42</span>
      <span className="text-mainGray">@tromboneMan😱</span>
     </div>
    </div>
    <button
     className="block w-fit mx-auto bg-main hover:bg-main/90 rounded-full px-4 py-2 text-white"
     type="submit"
    >
     Submit
    </button>
   </form>
  </Form>
 );
};
export default UsernameHandleForm;
