import { useState } from "react";

const initialFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};
const FormWithoutReactHookForm = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([""]); // errors are array of strings
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]); // clear errors
    //-------validate data ----------//
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => [...prev, "passwords do not match"]);
      return;
    }

    console.log(formData);
    setIsSubmitting(true); // show loading or disable submit button
    //-------send data to Server ----------//
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //....
    setFormData(initialFormData); // clear form
    setIsSubmitting(false);
  };
  return (
    <form
      className="flex flex-col gap-y-4 [&>div>input]:w-full"
      onSubmit={handleSubmit}
    >
      <label className="-mb-3 text-sm text-gray-500" htmlFor="email">
        email
      </label>
      <div className="border">
        <input
          type="email"
          required={true}
          placeholder="email"
          className="rounded px-4 py-2"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <label className="-mb-3 text-sm text-gray-500" htmlFor="password">
        password
      </label>
      <div className="relative border ">
        <input
          type={show ? "text" : "password"}
          id="password"
          placeholder="password"
          className="  block rounded py-2 pl-2 pr-12"
          required={true}
          minLength={8}
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        ></input>
        <p
          className="absolute  right-2 top-0 block cursor-pointer select-none py-2 "
          onClick={() => setShow((show) => !show)}
        >
          👁️
        </p>
      </div>
      <label className="-mb-3 text-sm text-gray-500" htmlFor="confirmPassword ">
        confirm password
      </label>
      <div className="relative border">
        <input
          id="confirmPassword"
          required={true}
          type={show1 ? "text" : "password"}
          placeholder="confirm password"
          className="rounded py-2 pl-2 pr-10 "
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
        />
        <p
          className="absolute  right-2 top-0 block cursor-pointer select-none py-2 "
          onClick={() => setShow1((show) => !show)}
        >
          👁️
        </p>
      </div>
      {
        // show errors
        errors.length > 0 && (
          <div className=" text-center text-red-500">
            {errors.map((error, i) => (
              <p key={i} className="text-sm">
                {error}
              </p>
            ))}
          </div>
        )
      }
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

export default FormWithoutReactHookForm;
