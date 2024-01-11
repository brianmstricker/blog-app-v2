"use client";
import { cn } from "@/lib/utils";

type CreateAccountLabelProps = {
 errors: any;
 form: any;
 field: string;
 type?: string;
};

const CreateAccountLabel = ({
 errors,
 form,
 field,
 type = "text",
}: CreateAccountLabelProps) => {
 const fieldValue = form.watch(field);
 return (
  <label
   htmlFor={field}
   className={cn(
    "relative group p-3 border border-mainGray/80 rounded w-full focus-within:outline focus-within:outline-1 focus-within:outline-main mt-3",
    fieldValue && errors && errors[field] && "!border-red-500 !outline-red-500"
   )}
  >
   <div
    className={cn(
     "absolute top-[18px] left-3 text-mainGray/80 w-fit select-none pointer-events-none transition-all duration-200 group-focus-within:top-1 group-focus-within:text-sm group-focus-within:text-main capitalize",
     fieldValue && "top-1 text-sm",
     fieldValue && errors && errors[field] && "!text-red-500"
    )}
   >
    {field}
   </div>
   <input
    id={field}
    className="outline-none mt-3 w-full bg-white dark:bg-black"
    {...form.register(field)}
    type={type}
   />
   {fieldValue && field === "name" && (
    <div className="text-sm text-mainGray/80 absolute top-1 right-3 hidden group-focus-within:block">
     {fieldValue.length}/50
    </div>
   )}
   {fieldValue && errors && errors[field] && (
    <div className="text-xs text-red-500 absolute -bottom-[20px]">
     {errors[field]}
    </div>
   )}
  </label>
 );
};
export default CreateAccountLabel;
