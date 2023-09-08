import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z
  .object({
    email: z
      .string()
      .nonempty("email is required")
      .email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  // we can use zod to validate using refine method
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // it will show error in confirmPassword field
  });

type ISignUpSchema = z.infer<typeof signUpSchema>; // create type from schema

const ReactHookFormWithZod = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { register, handleSubmit, formState, reset, setError } =
    useForm<ISignUpSchema>({
      resolver: zodResolver(signUpSchema), //tell which schema to resolve
    });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: ISignUpSchema) => {
    console.log(data);
    //-------send data to server----------//
    await new Promise((resolve) => setTimeout(resolve, 1000));
    /* 
    * we can use setError to show error in any field
    const res = await fetch(...)
    if(!res.ok){
    respose status is not 2xx
    alert("form submission failed")
    return;
    }
    if(res.errors){
    const errors = res.errors
    if(errors.email){
        setError("email",{message:errors.email})
    }
    else if(errors.password){
        setError("password",{message:errors.password})
    }
    else{
        alert("form submission failed")
    }
}
    */
    //---------------------
    reset(); // clear form
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 [&>div>input]:w-full"
    >
      <label className="-mb-3 text-sm text-gray-500" htmlFor="email">
        email
      </label>
      <div className="">
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className="rounded border px-4 py-2"
        />
        {
          // granular show errors
          errors.email && (
            <p className="text-sm text-red-500">{`${errors.email.message}`}</p>
          )
        }
      </div>
      <label className="-mb-3 text-sm text-gray-500" htmlFor="password">
        password
      </label>
      <div className="relative ">
        <input
          {...register("password")}
          type={show ? "text" : "password"}
          id="password"
          placeholder="password"
          className=" block rounded border py-2 pl-2 pr-12"
        ></input>
        <p
          className="absolute  right-2 top-0 block cursor-pointer select-none py-2 "
          onClick={() => setShow((show) => !show)}
        >
          👁️
        </p>
        {
          // granular show errors
          errors.password && (
            <p className="text-sm text-red-500">{`${errors.password.message}`}</p>
          )
        }
      </div>
      <label className="-mb-3 text-sm text-gray-500" htmlFor="confirmPassword ">
        confirm password
      </label>
      <div className="relative">
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          type={show1 ? "text" : "password"}
          placeholder="confirm password"
          className="rounded border py-2 pl-2 pr-10 "
        />
        <p
          className="absolute  right-2 top-0 block cursor-pointer select-none py-2 "
          onClick={() => setShow1((show) => !show)}
        >
          👁️
        </p>
        {
          // granular show errors
          errors.confirmPassword && (
            <p className="text-sm text-red-500">{`${errors.confirmPassword.message}`}</p>
          )
        }
      </div>

      <button
        type="submit"
        className="rounded bg-blue-500 py-2 text-white disabled:cursor-no-drop disabled:bg-gray-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "loading..." : "Submit"}
      </button>
    </form>
  );
};

export default ReactHookFormWithZod;
