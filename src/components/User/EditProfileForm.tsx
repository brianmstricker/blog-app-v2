"use client";

import { User } from "next-auth";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { UserSectionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CreateAccountLabel from "../CreateAccount/CreateAccountLabel";
import { isProfileFormValid } from "./profileFormValid";

const EditProfileForm = ({ user }: { user: User }) => {
 const form = useForm<z.infer<typeof UserSectionSchema>>({
  resolver: zodResolver(UserSectionSchema),
  defaultValues: {
   handle: user.handle,
   bio: user.bio ?? "",
   location: user.location ?? "",
   website: user.website ?? "",
   banner: user.banner ?? "",
   image: user.image ?? "",
  },
 });
 const isValid = isProfileFormValid(form);
 const { errors } = typeof isValid === "boolean" ? { errors: {} } : isValid;
 return (
  <Form {...form}>
   <form className="px-5 -mt-16 pb-20 flex flex-col gap-6">
    <CreateAccountLabel
     form={form}
     field="handle"
     text="handleUser"
     editAccountPage
     errors={errors}
    />
    <CreateAccountLabel
     form={form}
     field="bio"
     text="bioUser"
     editAccountPage
     errors={errors}
    />
    <CreateAccountLabel
     form={form}
     field="location"
     text="locationUser"
     editAccountPage
     errors={errors}
    />
    <CreateAccountLabel
     form={form}
     field="website"
     text="websiteUser"
     editAccountPage
     errors={errors}
    />
   </form>
  </Form>
 );
};
export default EditProfileForm;
