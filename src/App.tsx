import React from "react";
import FormWithoutReactHookForm from "./components/Form";
import ReactHookForm from "./components/ReactHookForm";

const App = () => {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center border border-black">
      <div className="mx-auto w-full rounded border border-blue-900 p-4 md:w-[300px]">
        {/* <FormWithoutReactHookForm /> */}
        <ReactHookForm />
      </div>
    </div>
  );
};

export default App;
