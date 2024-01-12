"use client";
import CreateAccountLabel from "./CreateAccountLabel";

export type ModalPageProps = {
 form: any;
 errors: any;
 emailExistError?: boolean;
};

const ModalPageOne = ({ form, errors, emailExistError }: ModalPageProps) => {
 return (
  <>
   <div className="font-bold text-xl">Step 1 of 2</div>
   <h2 className="text-3xl font-bold">Create your Account</h2>
   <>
    <CreateAccountLabel errors={errors} form={form} field="name" />
    <CreateAccountLabel
     errors={errors}
     form={form}
     field="email"
     type="email"
     emailExistError={emailExistError}
    />
    <CreateAccountLabel
     errors={errors}
     form={form}
     field="password"
     type="password"
    />
    <CreateAccountLabel
     errors={errors}
     form={form}
     field="confirmPassword"
     type="password"
    />
   </>
  </>
 );
};
export default ModalPageOne;
