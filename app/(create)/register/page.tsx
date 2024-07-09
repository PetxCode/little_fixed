import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const regUser = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    await fetch("https://little-fixed.vercel.app/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(() => {
      redirect("/signin");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-md w-[500px] min-h-[300px] p-4">
        <div className="pt-5 pb-10 border-b mb-10">Sign in Screen</div>
        <form action={regUser}>
          <div className="flex flex-col mb-3">
            <label className="text-[12px] font-semibold">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your Name"
              className="border rounded-md h-[45px] pl-2"
            />
          </div>

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
            Register
          </button>
        </form>

        <div className="text-center text-[12px] mt-2 ">
          Already have an Account{" "}
          <Link href="/signin" className="font-semibold italic">
            Sign in Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
