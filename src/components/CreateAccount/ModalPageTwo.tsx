"use client";
import CreateAccountLabel from "./CreateAccountLabel";
import { ModalPageProps } from "./ModalPageOne";

const ModalPageTwo = ({ form, errors, userExistError }: ModalPageProps) => {
 return (
  <>
   <div className="font-bold text-xl">Step 2 of 2</div>
   <h2 className="text-3xl font-bold">Finalize your Account</h2>
   <CreateAccountLabel
    errors={errors}
    form={form}
    field="username"
    userExistError={userExistError}
   />
   <CreateAccountLabel errors={errors} form={form} field="handle" />
   <div
    className="flex items-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 p-3 rounded-full w-fit mx-auto my-auto overflow-hidden max-w-[80%]"
    tabIndex={0}
   >
    <div className="w-11 h-11 rounded-full bg-blue-600 shrink-0" />
    <div className="flex flex-1 flex-col ml-4">
     <span className="font-bold text-[14px] leading-[18px]">
      {form.watch("username") || "jimbo42"}
     </span>
     <span className="font-bold text-[14px] leading-[18px]">{}</span>
     <span className="text-mainGray">
      @{form.watch("handle") || "tromboneMan😱"}
     </span>
    </div>
   </div>
  </>
 );
};
export default ModalPageTwo;
