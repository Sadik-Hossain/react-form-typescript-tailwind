import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
const initialFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};
const ReactHookForm = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    //-------send data to server----------//
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //------
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
      <div className="border">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "invaid email format",
            },
          })}
          type="email"
          placeholder="email"
          className="rounded px-4 py-2"
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
      <div className="relative border ">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type={show ? "text" : "password"}
          id="password"
          placeholder="password"
          className="  block rounded py-2 pl-2 pr-12"
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
      <div className="relative border">
        <input
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => {
              return (
                // getValues from "password" input
                value === getValues("password") || "Passwords do not match"
              );
            },
          })}
          id="confirmPassword"
          type={show1 ? "text" : "password"}
          placeholder="confirm password"
          className="rounded py-2 pl-2 pr-10 "
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

export default ReactHookForm;
