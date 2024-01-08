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

const UsernameHandleForm = () => {
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
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
     control={form.control}
     name="username"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Username</FormLabel>
       <FormControl>
        <Input placeholder="shadcn" {...field} />
       </FormControl>
       <FormDescription>This is your public display name.</FormDescription>
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
        <Input placeholder="shadcn" {...field} />
       </FormControl>
       <FormDescription>This is your public display name.</FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />
    <button type="submit">Submit</button>
   </form>
  </Form>
 );
};
export default UsernameHandleForm;
