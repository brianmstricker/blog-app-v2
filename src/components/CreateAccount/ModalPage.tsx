import CreateAccountLabel from "./CreateAccountLabel";

type ModalPageProps = {
 page: number;
 form: any;
 errors: any;
};

const ModalPage = ({ page, form, errors }: ModalPageProps) => {
 return (
  <>
   <div className="font-bold text-xl">
    {page === 1 ? "Step 1 of 2" : "Step 2 of 2"}
   </div>
   <h2 className="text-3xl font-bold">
    {page === 1 ? "Create your Account" : "Finalize your Account"}
   </h2>
   <CreateAccountLabel errors={errors} form={form} field="name" />
   <CreateAccountLabel errors={errors} form={form} field="email" type="email" />
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
 );
};
export default ModalPage;
