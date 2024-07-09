"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const page = () => {
  const signinFn = (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    signIn("credentials", { email, password });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-md w-[500px] min-h-[300px] p-4">
        <div className="pt-5 pb-10 border-b mb-10">Register Screen</div>
        <form action={signinFn}>
          <div className="flex flex-col mb-3">
            <label className="text-[12px] font-semibold">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter your Email"
              className="border rounded-md h-[45px] pl-2"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-[12px] font-semibold">Password</label>
            <input
              name="password"
              type="text"
              placeholder="Enter your Password"
              className="border rounded-md h-[45px] pl-2"
            />
          </div>

          <button
            type="submit"
            className="flex justify-center items-center mt-5 rounded-md w-full text-white bg-black h-[50px]"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-[12px] mt-2 ">
          Don't have an Account{" "}
          <Link href="/register" className="font-semibold italic">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
