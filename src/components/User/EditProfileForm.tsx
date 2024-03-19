"use client";

import { User } from "next-auth";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { UserSectionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const EditProfileForm = ({ user }: { user: User }) => {
 const form = useForm<z.infer<typeof UserSectionSchema>>({
  resolver: zodResolver(UserSectionSchema),
  defaultValues: {},
 });
 return (
  <Form {...form}>
   <form className="px-5 -mt-16">EditProfileForm</form>
  </Form>
 );
};
export default EditProfileForm;
